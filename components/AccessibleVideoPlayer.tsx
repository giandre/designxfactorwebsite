import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, PlayCircle } from 'lucide-react';

interface AccessibleVideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  description?: string;
  captionsUrl?: string;
  autoPlay?: boolean;
  className?: string;
}

export const AccessibleVideoPlayer: React.FC<AccessibleVideoPlayerProps> = ({
  src,
  poster,
  title,
  description,
  captionsUrl,
  autoPlay = false,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCaptions, setShowCaptions] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Ensure captions are loaded
    if (video.textTracks.length > 0) {
      const track = video.textTracks[0];
      track.mode = 'hidden'; // Start hidden
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!document.fullscreenElement) {
        await video.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const toggleCaptions = () => {
    const video = videoRef.current;
    if (!video || !video.textTracks || video.textTracks.length === 0) {
      console.warn('No text tracks available');
      return;
    }

    const track = video.textTracks[0];
    const newShowState = !showCaptions;

    track.mode = newShowState ? 'showing' : 'hidden';
    setShowCaptions(newShowState);

    console.log('Captions toggled:', newShowState, 'Track mode:', track.mode);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'm':
        e.preventDefault();
        toggleMute();
        break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'c':
        e.preventDefault();
        toggleCaptions();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime -= 5;
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (videoRef.current) videoRef.current.currentTime += 5;
        break;
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`relative group ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Video player: ${title}`}
    >
      <style>{`
        video::-webkit-media-text-track-display {
          padding-bottom: 70px;
        }
        video::cue {
          line-height: 1.4;
        }
      `}</style>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        crossOrigin="anonymous"
        aria-label={title}
        aria-describedby={description ? 'video-description' : undefined}
      >
        {captionsUrl && (
          <track
            ref={trackRef}
            kind="subtitles"
            src={captionsUrl}
            srcLang="en"
            label="English"
          />
        )}
        Your browser does not support the video tag.
      </video>

      {description && (
        <div id="video-description" className="sr-only">
          {description}
        </div>
      )}

      {/* Play Button Overlay - Shows when video is not playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30">
          <button
            onClick={togglePlay}
            className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-white shadow-2xl"
            aria-label="Play video"
          >
            <Play size={40} className="text-black ml-1" fill="black" />
          </button>
        </div>
      )}

      {/* Custom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div
          className="mb-3 h-1 bg-white/30 rounded cursor-pointer hover:h-2 focus-within:h-2 transition-all"
          onClick={handleProgressClick}
          onKeyDown={(e) => {
            const video = videoRef.current;
            if (!video) return;
            if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); video.currentTime = Math.max(0, video.currentTime - 5); }
            if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); video.currentTime = Math.min(video.duration, video.currentTime + 5); }
          }}
          role="slider"
          tabIndex={0}
          aria-label="Video progress"
          aria-valuenow={Math.floor(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        >
          <div
            className="h-full bg-brand-red rounded"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-3 text-white">
          <button
            onClick={togglePlay}
            className="p-2 hover:bg-white/20 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 hover:bg-white/20 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <span className="text-sm" aria-live="polite">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {captionsUrl && (
            <button
              onClick={toggleCaptions}
              className={`p-2 hover:bg-white/20 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                showCaptions ? 'bg-white/20' : ''
              }`}
              aria-label="Toggle captions"
              aria-pressed={showCaptions}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 7H9.5v-.5h-2v3h2V13H11v1c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1zm7 0h-1.5v-.5h-2v3h2V13H18v1c0 .55-.45 1-1 1h-3c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v1z" />
              </svg>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/20 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="sr-only" aria-live="polite" role="status">
        Video player keyboard shortcuts: Space or K to play/pause, M to mute, F for fullscreen, C for captions, Left/Right arrows to seek.
      </div>
    </div>
  );
};
