/**
 * SlideshowPlayer - Scene-based video player with audio narration
 *
 * A versatile slideshow player that combines:
 * - Scene-based slides with background images
 * - Audio narration per scene
 * - Rich HTML/CSS template overlays
 * - Ken Burns animation effects
 * - Full player controls (play/pause, nav, volume, CC, fullscreen)
 * - Proper pause/resume with scene timing tracking
 *
 * Usage:
 *   new SlideshowPlayer(container, scenes, audioUrls, {
 *     autoPlay: false,
 *     captionsEnabled: true
 *   });
 *
 * Scene format:
 *   {
 *     id: 'scene-01',
 *     heading: 'Title',
 *     script: 'Narration text...',
 *     duration: 10,
 *     templateHTML: '<div class="...">...</div>'
 *   }
 */
class SlideshowPlayer {
  constructor(container, scenes, audioUrls = {}, options = {}) {
    this.container = typeof container === 'string'
      ? document.getElementById(container)
      : container;
    this.scenes = scenes || [];
    this.audioUrls = audioUrls;
    this.options = {
      autoPlay: false,
      captionsEnabled: true,
      basePath: '',  // Base path for relative URLs (e.g., '../' when in lessons folder)
      ...options
    };

    this.currentIndex = 0;
    this.isPlaying = false;
    this.hasStarted = false;  // Track if playback has ever started (for proper play/pause behavior)
    this.currentAudio = null;
    this.sceneTimer = null;
    this.progressInterval = null;
    this.sceneStartTime = 0;
    this.sceneElapsed = 0;
    this.volume = 1;
    this.captionsEnabled = this.options.captionsEnabled;
    this.isFullscreen = false;
    this.basePath = this.options.basePath;

    this.init();
  }

  init() {
    if (!this.container) {
      console.error('SlideshowPlayer: Container not found');
      return;
    }

    this.container.classList.add('slideshow-player');
    this.renderSlides();
    this.renderCaptionContainer();
    this.renderControls();
    this.showSlide(0, false);
    this.bindEvents();
    this.updateProgress();

    if (this.options.autoPlay) {
      this.play();
    }
  }

  renderSlides() {
    const slidesContainer = document.createElement('div');
    slidesContainer.className = 'slideshow-slides';

    this.scenes.forEach((scene, index) => {
      const slide = document.createElement('div');
      slide.className = 'slideshow-slide';
      slide.id = `slide-${index}`;

      // If templateHTML provided, use it directly
      if (scene.templateHTML) {
        // Fix image paths by prepending basePath if needed
        let html = scene.templateHTML;
        if (this.basePath) {
          html = html.replace(/src="videos\//g, `src="${this.basePath}videos/`);
          html = html.replace(/src='videos\//g, `src='${this.basePath}videos/`);
        }
        // Inject 'active' class to video-slide elements within for CSS visibility
        html = html.replace(/class="([^"]*video-slide[^"]*)"/g, (match, classes) => {
          // Don't double-add active class
          if (classes.includes('active')) return match;
          return `class="${classes}"`;
        });
        slide.innerHTML = html;
      } else {
        // Fallback: simple heading display
        slide.innerHTML = `
          <div class="slideshow-slide__content">
            <h2>${scene.heading || 'Slide ' + (index + 1)}</h2>
          </div>
        `;
      }

      slidesContainer.appendChild(slide);
    });

    this.container.appendChild(slidesContainer);
  }

  renderCaptionContainer() {
    const captionContainer = document.createElement('div');
    captionContainer.className = 'slideshow-caption';
    captionContainer.innerHTML = '<span class="slideshow-caption__text"></span>';
    this.container.appendChild(captionContainer);

    this.captionContainer = captionContainer;
    this.captionText = captionContainer.querySelector('.slideshow-caption__text');

    if (!this.captionsEnabled) {
      captionContainer.classList.add('hidden');
    }
  }

  renderControls() {
    const controls = document.createElement('div');
    controls.className = 'slideshow-controls';
    controls.innerHTML = `
      <div class="slideshow-controls__row slideshow-controls__row--progress">
        <div class="slideshow-progress" id="progressBar">
          <div class="slideshow-progress__fill" id="progressFill"></div>
        </div>
      </div>
      <div class="slideshow-controls__row slideshow-controls__row--buttons">
        <button class="slideshow-btn slideshow-btn--play" id="playBtn" title="Play/Pause (Space)">
          <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </button>

        <button class="slideshow-btn" id="prevBtn" title="Previous">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>

        <button class="slideshow-btn" id="nextBtn" title="Next">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>

        <span class="slideshow-time" id="timeDisplay">0:00 / 0:00</span>

        <div class="slideshow-volume">
          <button class="slideshow-btn" id="volumeBtn" title="Mute/Unmute">
            <svg class="icon-volume-on" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            <svg class="icon-volume-off" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          </button>
          <input type="range" class="slideshow-volume__slider" id="volumeSlider" min="0" max="1" step="0.1" value="1">
        </div>

        <button class="slideshow-btn ${this.captionsEnabled ? 'active' : ''}" id="ccBtn" title="Captions (C)">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z"/></svg>
        </button>

        <button class="slideshow-btn" id="fullscreenBtn" title="Fullscreen (F)">
          <svg class="icon-fullscreen" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
          <svg class="icon-fullscreen-exit" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
        </button>
      </div>
    `;
    this.container.appendChild(controls);

    // Store references
    this.playBtn = controls.querySelector('#playBtn');
    this.progressFill = controls.querySelector('#progressFill');
    this.progressBar = controls.querySelector('#progressBar');
    this.timeDisplay = controls.querySelector('#timeDisplay');
    this.volumeSlider = controls.querySelector('#volumeSlider');
    this.volumeBtn = controls.querySelector('#volumeBtn');
    this.ccBtn = controls.querySelector('#ccBtn');
  }

  bindEvents() {
    // Play/Pause
    this.playBtn.addEventListener('click', () => this.togglePlay());

    // Navigation
    this.container.querySelector('#prevBtn').addEventListener('click', () => this.prevSlide());
    this.container.querySelector('#nextBtn').addEventListener('click', () => this.nextSlide());

    // Progress bar seeking
    this.progressBar.addEventListener('click', (e) => this.seekToPosition(e));

    // Volume
    this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    this.volumeBtn.addEventListener('click', () => this.toggleMute());

    // Captions
    this.ccBtn.addEventListener('click', () => this.toggleCaptions());

    // Fullscreen
    this.container.querySelector('#fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Fullscreen change event
    document.addEventListener('fullscreenchange', () => this.onFullscreenChange());
  }

  handleKeydown(e) {
    // Don't handle if focus is in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        this.togglePlay();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
      case 'c':
        this.toggleCaptions();
        break;
      case 'f':
        this.toggleFullscreen();
        break;
      case 'm':
        this.toggleMute();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.setVolume(Math.min(1, this.volume + 0.1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.setVolume(Math.max(0, this.volume - 0.1));
        break;
    }
  }

  togglePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  play() {
    this.isPlaying = true;
    this.hasStarted = true;  // Mark as started when play is called
    this.updatePlayButton();
    this.sceneStartTime = Date.now() - (this.sceneElapsed * 1000);
    this.startSceneTimer();
    this.startProgressUpdater();
    this.playAudio();
    this.updateCaption();
  }

  pause() {
    this.isPlaying = false;
    this.updatePlayButton();

    if (this.sceneTimer) {
      clearTimeout(this.sceneTimer);
      this.sceneElapsed = (Date.now() - this.sceneStartTime) / 1000;
    }

    this.stopProgressUpdater();
    this.stopAudio();
  }

  updatePlayButton() {
    const playIcon = this.playBtn.querySelector('.icon-play');
    const pauseIcon = this.playBtn.querySelector('.icon-pause');

    if (this.isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }

  startProgressUpdater() {
    this.stopProgressUpdater();
    this.progressInterval = setInterval(() => {
      if (this.isPlaying) {
        this.sceneElapsed = (Date.now() - this.sceneStartTime) / 1000;
        this.updateProgress();
      }
    }, 100);
  }

  stopProgressUpdater() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  startSceneTimer() {
    if (!this.isPlaying) return;

    if (this.sceneTimer) {
      clearTimeout(this.sceneTimer);
    }

    // Timer serves as fallback - audio 'ended' event is primary advancement
    const scene = this.scenes[this.currentIndex];
    const duration = Math.max((scene.duration || 10) * 1000, 15000);
    const remaining = duration - (this.sceneElapsed * 1000);

    this.sceneTimer = setTimeout(() => {
      // Only advance if audio isn't still playing
      if (this.currentAudio && !this.currentAudio.paused && !this.currentAudio.ended) {
        return;
      }

      if (this.currentIndex < this.scenes.length - 1) {
        this.advanceToNextSlide();
      } else {
        this.pause();
        this.sceneElapsed = 0;
      }
    }, remaining);
  }

  advanceToNextSlide() {
    this.sceneElapsed = 0;
    this.currentIndex++;
    this.showSlideVisual(this.currentIndex);
    this.sceneStartTime = Date.now();
    this.startSceneTimer();
    this.playAudio();
    this.updateCaption();
  }

  playAudio() {
    const scene = this.scenes[this.currentIndex];
    // Support both audioUrls map and scene.audioUrl property
    let audioUrl = this.audioUrls[scene.id] || scene.audioUrl;

    // Prepend basePath if needed
    if (audioUrl && this.basePath && !audioUrl.startsWith('http') && !audioUrl.startsWith('/')) {
      audioUrl = this.basePath + audioUrl;
    }

    this.stopAudio();

    if (audioUrl) {
      this.currentAudio = new Audio(audioUrl);
      this.currentAudio.volume = this.volume;

      this.currentAudio.addEventListener('ended', () => {
        if (this.isPlaying && this.currentIndex < this.scenes.length - 1) {
          setTimeout(() => {
            if (this.isPlaying) {
              clearTimeout(this.sceneTimer);
              this.advanceToNextSlide();
            }
          }, 500);
        } else if (this.currentIndex >= this.scenes.length - 1) {
          setTimeout(() => this.pause(), 500);
        }
      });

      this.currentAudio.play().catch(err => {
        console.warn('Audio playback failed:', err);
      });
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  showSlideVisual(index) {
    const slides = this.container.querySelectorAll('.slideshow-slide');
    slides.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
    this.updateProgress();
  }

  showSlide(index, playAudio = true) {
    this.sceneElapsed = 0;
    this.currentIndex = index;

    this.showSlideVisual(index);
    this.updateCaption();

    if (this.isPlaying) {
      clearTimeout(this.sceneTimer);
      this.sceneStartTime = Date.now();
      this.startSceneTimer();
      if (playAudio) {
        this.playAudio();
      }
    }
  }

  nextSlide() {
    if (this.currentIndex < this.scenes.length - 1) {
      this.showSlide(this.currentIndex + 1, this.isPlaying);
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.showSlide(this.currentIndex - 1, this.isPlaying);
    }
  }

  seekToPosition(e) {
    const rect = this.progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const totalDuration = this.scenes.reduce((sum, s) => sum + (s.duration || 7), 0);
    const targetTime = percent * totalDuration;

    // Find which slide and position within it
    let cumulative = 0;
    for (let i = 0; i < this.scenes.length; i++) {
      const sceneDuration = this.scenes[i].duration || 7;
      if (cumulative + sceneDuration > targetTime) {
        this.currentIndex = i;
        this.sceneElapsed = targetTime - cumulative;
        break;
      }
      cumulative += sceneDuration;
    }

    this.showSlideVisual(this.currentIndex);
    this.updateCaption();

    if (this.isPlaying) {
      this.sceneStartTime = Date.now() - (this.sceneElapsed * 1000);
      clearTimeout(this.sceneTimer);
      this.startSceneTimer();
      this.playAudio();
    }
  }

  setVolume(value) {
    this.volume = parseFloat(value);
    this.volumeSlider.value = this.volume;

    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }

    this.updateVolumeIcon();
  }

  toggleMute() {
    if (this.volume > 0) {
      this.previousVolume = this.volume;
      this.setVolume(0);
    } else {
      this.setVolume(this.previousVolume || 1);
    }
  }

  updateVolumeIcon() {
    const volumeOn = this.volumeBtn.querySelector('.icon-volume-on');
    const volumeOff = this.volumeBtn.querySelector('.icon-volume-off');

    if (this.volume === 0) {
      volumeOn.style.display = 'none';
      volumeOff.style.display = 'block';
    } else {
      volumeOn.style.display = 'block';
      volumeOff.style.display = 'none';
    }
  }

  toggleCaptions() {
    this.captionsEnabled = !this.captionsEnabled;
    this.captionContainer.classList.toggle('hidden', !this.captionsEnabled);
    this.ccBtn.classList.toggle('active', this.captionsEnabled);
  }

  updateCaption() {
    if (!this.captionsEnabled) return;

    const scene = this.scenes[this.currentIndex];
    this.captionText.textContent = scene.script || scene.heading || '';
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  onFullscreenChange() {
    this.isFullscreen = !!document.fullscreenElement;
    this.container.classList.toggle('fullscreen', this.isFullscreen);

    const fullscreenIcon = this.container.querySelector('.icon-fullscreen');
    const exitIcon = this.container.querySelector('.icon-fullscreen-exit');

    if (this.isFullscreen) {
      fullscreenIcon.style.display = 'none';
      exitIcon.style.display = 'block';
    } else {
      fullscreenIcon.style.display = 'block';
      exitIcon.style.display = 'none';
    }
  }

  updateProgress() {
    const totalDuration = this.scenes.reduce((sum, s) => sum + (s.duration || 7), 0);

    let currentTime = 0;
    for (let i = 0; i < this.currentIndex; i++) {
      currentTime += this.scenes[i].duration || 7;
    }
    currentTime += Math.min(this.sceneElapsed, this.scenes[this.currentIndex]?.duration || 7);

    const percent = (currentTime / totalDuration) * 100;
    this.progressFill.style.width = percent + '%';

    this.timeDisplay.textContent = this.formatTime(currentTime) + ' / ' + this.formatTime(totalDuration);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + secs.toString().padStart(2, '0');
  }

  destroy() {
    this.pause();
    this.stopProgressUpdater();
    if (this.sceneTimer) {
      clearTimeout(this.sceneTimer);
    }
    this.container.innerHTML = '';
    this.container.classList.remove('slideshow-player');
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SlideshowPlayer;
}
