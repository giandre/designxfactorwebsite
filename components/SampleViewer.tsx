import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  BookOpen,
  FileText,
  GraduationCap,
  Lock,
  Maximize2,
  Minimize2,
  Loader2,
  Headphones,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Captions,
  CaptionsOff,
  ExternalLink,
  Monitor
} from 'lucide-react';

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

type SampleType = 'video' | 'ebook' | 'pdf' | 'course' | 'audio';

interface SampleViewerProps {
  isOpen: boolean;
  onClose: () => void;
  type: SampleType;
  title: string;
  description: string;
  content: SampleContent;
}

interface VideoContent {
  type: 'video';
  src: string;
  thumbnail?: string;
}

interface EbookContent {
  type: 'ebook';
  src: string;
}

interface PDFContent {
  type: 'pdf';
  items: {
    title: string;
    language: string;
    src: string;
    thumbnail?: string;
  }[];
}

interface CourseContent {
  type: 'course';
  basePath: string;
  weeks: {
    number: number;
    title: string;
    locked: boolean;
    lessons: {
      id: string;
      title: string;
      src: string;
    }[];
  }[];
}

interface CaptionSegment {
  start: number;  // seconds
  end: number;    // seconds
  speaker?: string;
  text: string;
}

interface AudioItem {
  id: string;
  title: string;
  description: string;
  src?: string;  // For WAV/MP3 files
  spotifyEmbedUrl?: string;  // For Spotify embeds
  duration?: string;
  captions?: CaptionSegment[];  // Optional captions/transcript
}

interface AudioContent {
  type: 'audio';
  items: AudioItem[];
}

type SampleContent = VideoContent | EbookContent | PDFContent | CourseContent | AudioContent;

// Loading Spinner Component
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading content...' }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
    <div className="relative">
      <Loader2 size={48} className="text-brand-gold animate-spin" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full bg-brand-gold/20" />
      </div>
    </div>
    <p className="mt-4 text-slate-400 text-sm">{message}</p>
    <p className="mt-2 text-slate-500 text-xs">Large files may take a moment</p>
  </div>
);

// Mobile fallback component for "open in new tab" experience
const MobileOpenInNewTab: React.FC<{
  title: string;
  description: string;
  url: string;
  typeColor: string;
  icon: React.ElementType;
  onClose: () => void;
}> = ({ title, description, url, typeColor, icon: Icon, onClose }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
      style={{ backgroundColor: `${typeColor}20` }}
    >
      <Icon size={36} style={{ color: typeColor }} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm mb-6 max-w-sm">{description}</p>
    <p className="text-slate-500 text-xs mb-6">
      For the best experience, this content opens in a new tab on mobile devices.
    </p>
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-white"
        style={{ backgroundColor: typeColor }}
        onClick={onClose}
      >
        <ExternalLink size={18} />
        Open in New Tab
      </a>
      <button
        onClick={onClose}
        className="px-6 py-3 rounded-xl font-semibold transition-all bg-white/10 text-white hover:bg-white/20"
      >
        Cancel
      </button>
    </div>
  </div>
);

// Desktop-only notice component for ebook
const DesktopOnlyNotice: React.FC<{
  title: string;
  onClose: () => void;
}> = ({ title, onClose }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-brand-blue/20">
      <Monitor size={36} className="text-brand-blue" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm mb-4 max-w-sm">
      This interactive experience is optimized for desktop browsers.
    </p>
    <div className="p-4 bg-brand-blue/10 border border-brand-blue/30 rounded-xl mb-6 max-w-sm">
      <p className="text-brand-blue text-sm">
        Please visit on a desktop or laptop computer for the full interactive experience.
      </p>
    </div>
    <button
      onClick={onClose}
      className="px-6 py-3 rounded-xl font-semibold transition-all bg-white/10 text-white hover:bg-white/20"
    >
      Close
    </button>
  </div>
);

export const SampleViewer: React.FC<SampleViewerProps> = ({
  isOpen,
  onClose,
  type,
  title,
  description,
  content
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'video': return Play;
      case 'ebook': return BookOpen;
      case 'pdf': return FileText;
      case 'course': return GraduationCap;
      case 'audio': return Headphones;
      default: return FileText;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'video': return '#d946ef';
      case 'ebook': return '#38bdf8';
      case 'pdf': return '#f59e0b';
      case 'course': return '#ff4d6d';
      case 'audio': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  const TypeIcon = getTypeIcon();
  const typeColor = getTypeColor();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-viewer-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-space border border-white/10 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-[95vw] max-w-7xl h-[90vh] max-h-[900px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${typeColor}20` }}
            >
              <TypeIcon size={20} style={{ color: typeColor }} />
            </div>
            <div>
              <h2
                id="sample-viewer-title"
                className="text-lg font-bold text-white"
              >
                {title}
              </h2>
              <p className="text-sm text-slate-400">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Mobile handling for different content types */}
          {isMobile && content.type === 'ebook' && (
            <DesktopOnlyNotice title={title} onClose={onClose} />
          )}
          {isMobile && content.type === 'video' && (
            <MobileOpenInNewTab
              title={title}
              description={description}
              url={content.src}
              typeColor={typeColor}
              icon={TypeIcon}
              onClose={onClose}
            />
          )}
          {isMobile && content.type === 'course' && (
            <MobileOpenInNewTab
              title={title}
              description={description}
              url={`${content.basePath}/index.html`}
              typeColor={typeColor}
              icon={TypeIcon}
              onClose={onClose}
            />
          )}
          {isMobile && content.type === 'pdf' && (
            <MobileOpenInNewTab
              title={title}
              description={description}
              url={content.items[0]?.src || '#'}
              typeColor={typeColor}
              icon={TypeIcon}
              onClose={onClose}
            />
          )}
          {/* Audio works fine on mobile - show normally */}
          {isMobile && content.type === 'audio' && (
            <AudioViewer items={content.items} />
          )}

          {/* Desktop: show full embedded experience */}
          {!isMobile && content.type === 'video' && (
            <VideoViewer src={content.src} />
          )}
          {!isMobile && content.type === 'ebook' && (
            <EbookViewer src={content.src} />
          )}
          {!isMobile && content.type === 'pdf' && (
            <PDFGalleryViewer items={content.items} />
          )}
          {!isMobile && content.type === 'course' && (
            <CourseViewer basePath={content.basePath} weeks={content.weeks} />
          )}
          {!isMobile && content.type === 'audio' && (
            <AudioViewer items={content.items} />
          )}
        </div>
      </div>
    </div>
  );
};

// Video Viewer - Embeds HTML file with video player
const VideoViewer: React.FC<{ src: string }> = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full relative">
      {isLoading && <LoadingSpinner message="Loading video experience..." />}
      <iframe
        src={src}
        className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        title="Video Sample"
        allow="autoplay; fullscreen"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// Ebook Viewer - Embeds HTML file with interactive ebook
const EbookViewer: React.FC<{ src: string }> = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full relative">
      {isLoading && <LoadingSpinner message="Loading interactive eBook..." />}
      <iframe
        src={src}
        className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        title="eBook Sample"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// PDF Gallery Viewer - Shows PDFs with thumbnails
const PDFGalleryViewer: React.FC<{
  items: { title: string; language: string; src: string; thumbnail?: string }[]
}> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const selectedItem = items[selectedIndex];

  const handleSelect = (index: number) => {
    if (index !== selectedIndex) {
      setIsLoading(true);
      setSelectedIndex(index);
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* PDF Preview */}
      <div className="flex-1 bg-slate-900 flex items-center justify-center p-4 relative">
        {isLoading && <LoadingSpinner message="Loading PDF..." />}
        <iframe
          src={`${selectedItem.src}#toolbar=0&navpanes=0`}
          className={`w-full h-full rounded-lg shadow-2xl transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          title={selectedItem.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Sidebar - PDF Selection */}
      <div className="w-full lg:w-72 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
          Select Publication
        </h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                selectedIndex === index
                  ? 'bg-brand-gold/20 border-brand-gold'
                  : 'bg-white/5 border-transparent hover:bg-white/10'
              } border`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedIndex === index ? 'bg-brand-gold/30' : 'bg-white/10'
                  }`}
                >
                  <FileText
                    size={18}
                    className={selectedIndex === index ? 'text-brand-gold' : 'text-slate-400'}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    selectedIndex === index ? 'text-white' : 'text-slate-300'
                  }`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.language}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-xl">
          <p className="text-xs text-slate-400 text-center">
            These devotionals showcase multi-language support and Amazon KDP ready formatting.
          </p>
        </div>
      </div>
    </div>
  );
};

// Course Viewer - Shows course with Week 1 unlocked, others locked
const CourseViewer: React.FC<{
  basePath: string;
  weeks: {
    number: number;
    title: string;
    locked: boolean;
    lessons: { id: string; title: string; src: string }[];
  }[]
}> = ({ basePath, weeks }) => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showCourseHome, setShowCourseHome] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const currentWeek = weeks[selectedWeek];
  const isWeekLocked = currentWeek.locked;

  const handleWeekSelect = (index: number) => {
    if (!weeks[index].locked) {
      setIsLoading(true);
      setSelectedWeek(index);
      setSelectedLesson(null);
      setShowCourseHome(false);
    }
  };

  const handleLessonSelect = (lessonSrc: string) => {
    if (!isWeekLocked) {
      setIsLoading(true);
      setSelectedLesson(lessonSrc);
      setShowCourseHome(false);
    }
  };

  const goToCourseHome = () => {
    setIsLoading(true);
    setShowCourseHome(true);
    setSelectedLesson(null);
  };

  // Determine what to display in iframe
  const iframeSrc = showCourseHome
    ? `${basePath}/index.html`
    : selectedLesson || `${basePath}/week-${currentWeek.number}.html`;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* Course Content */}
      <div className="flex-1 bg-slate-900 relative">
        {isLoading && <LoadingSpinner message="Loading course content..." />}
        <iframe
          src={iframeSrc}
          className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          title="Course Preview"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Course Navigation Sidebar */}
      <div className="w-full lg:w-80 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col overflow-hidden">
        {/* Course Home Button */}
        <button
          onClick={goToCourseHome}
          className={`w-full p-4 text-left border-b border-white/10 transition-colors ${
            showCourseHome
              ? 'bg-brand-red/20 text-white'
              : 'hover:bg-white/5 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <GraduationCap size={20} className={showCourseHome ? 'text-brand-red' : 'text-slate-400'} />
            <span className="font-semibold">Course Home</span>
          </div>
        </button>

        {/* Week Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Course Weeks
          </h3>

          <div className="space-y-2">
            {weeks.map((week, index) => (
              <div key={week.number}>
                <button
                  onClick={() => handleWeekSelect(index)}
                  disabled={week.locked}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedWeek === index && !showCourseHome
                      ? 'bg-brand-red/20 border-brand-red'
                      : week.locked
                        ? 'bg-white/[0.02] border-transparent cursor-not-allowed opacity-60'
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                  } border`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                          selectedWeek === index && !showCourseHome
                            ? 'bg-brand-red/30 text-brand-red'
                            : week.locked
                              ? 'bg-white/5 text-slate-600'
                              : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        {week.number}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          week.locked ? 'text-slate-500' : 'text-slate-200'
                        }`}>
                          Week {week.number}
                        </p>
                        <p className="text-xs text-slate-500 truncate max-w-[140px]">
                          {week.title}
                        </p>
                      </div>
                    </div>
                    {week.locked && (
                      <Lock size={16} className="text-slate-600" />
                    )}
                  </div>
                </button>

                {/* Lessons for selected week */}
                {selectedWeek === index && !week.locked && !showCourseHome && (
                  <div className="mt-2 ml-4 pl-4 border-l border-white/10 space-y-1">
                    {week.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson.src)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedLesson === lesson.src
                            ? 'bg-white/10 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {lesson.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview Notice */}
        <div className="p-4 bg-brand-gold/10 border-t border-brand-gold/20">
          <div className="flex items-start gap-3">
            <Lock size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-brand-gold">Preview Mode</p>
              <p className="text-xs text-slate-400 mt-1">
                Week 1 is fully accessible. Weeks 2-7 are locked in this demo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Audio Viewer - Plays audio files and Spotify embeds
const AudioViewer: React.FC<{
  items: AudioItem[];
}> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCaptions, setShowCaptions] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const captionsRef = useRef<HTMLDivElement>(null);

  const selectedItem = items[selectedIndex];
  const isSpotify = !!selectedItem.spotifyEmbedUrl;
  const hasCaptions = !isSpotify && selectedItem.captions && selectedItem.captions.length > 0;

  // Get current caption based on playback time
  const getCurrentCaption = (): CaptionSegment | null => {
    if (!selectedItem.captions) return null;
    return selectedItem.captions.find(
      cap => currentTime >= cap.start && currentTime < cap.end
    ) || null;
  };

  const currentCaption = getCurrentCaption();

  // Auto-scroll to current caption in transcript
  useEffect(() => {
    if (showCaptions && captionsRef.current && currentCaption) {
      const activeElement = captionsRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentCaption, showCaptions]);

  // Jump to caption time when clicking on a transcript segment
  const jumpToCaption = (startTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      setCurrentTime(startTime);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    // Reset state when changing items
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    setShowCaptions(false);
  }, [selectedIndex]);

  const handleSelect = (index: number) => {
    if (index !== selectedIndex) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setSelectedIndex(index);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume || 1;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* Audio Player Area */}
      <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 relative">
        {isSpotify ? (
          // Spotify Embed
          <div className="w-full max-w-2xl">
            <iframe
              src={selectedItem.spotifyEmbedUrl}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
              onLoad={() => setIsLoading(false)}
            />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">{selectedItem.title}</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">{selectedItem.description}</p>
            </div>
          </div>
        ) : (
          // Native Audio Player
          <div className="w-full max-w-xl">
            {/* Waveform visualization placeholder */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto rounded-full bg-brand-gold/20 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(245,158,11,0.3)]">
                <Headphones size={56} className="text-brand-gold" />
              </div>

              {/* Audio info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">{selectedItem.description}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-brand-gold [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #f59e0b ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.1) ${(currentTime / (duration || 1)) * 100}%)`
                }}
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => skip(-10)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Skip back 10 seconds"
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={togglePlayPause}
                className="p-5 rounded-full bg-brand-gold hover:bg-brand-gold/90 text-black transition-all hover:scale-105 shadow-lg"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 size={28} className="animate-spin" />
                ) : isPlaying ? (
                  <Pause size={28} />
                ) : (
                  <Play size={28} className="ml-1" />
                )}
              </button>

              <button
                onClick={() => skip(10)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Skip forward 10 seconds"
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Volume control and CC toggle */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>

              {/* CC Toggle Button */}
              {hasCaptions && (
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`p-2 rounded-lg transition-colors ${
                    showCaptions
                      ? 'bg-brand-gold/20 text-brand-gold'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label={showCaptions ? 'Hide captions' : 'Show captions'}
                  title={showCaptions ? 'Hide transcript' : 'Show transcript'}
                >
                  {showCaptions ? <Captions size={20} /> : <CaptionsOff size={20} />}
                </button>
              )}
            </div>

            {/* Live Caption Display */}
            {hasCaptions && showCaptions && currentCaption && (
              <div className="mt-4 p-3 bg-black/60 backdrop-blur-sm rounded-lg border border-white/10">
                {currentCaption.speaker && (
                  <p className="text-xs text-brand-gold font-semibold mb-1">{currentCaption.speaker}</p>
                )}
                <p className="text-sm text-white">{currentCaption.text}</p>
              </div>
            )}

            {/* Hidden audio element */}
            {selectedItem.src && (
              <audio
                ref={audioRef}
                src={selectedItem.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onCanPlay={() => setIsLoading(false)}
              />
            )}
          </div>
        )}

        {/* Notice about AI-generated content */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <p className="text-xs text-slate-400 text-center">
              {isSpotify
                ? 'This podcast was entirely generated using AI - from script to voices to production.'
                : 'This is a raw, unedited AI interview showcasing real-time conversational AI capabilities. Pauses and delays are intentional to demonstrate the live experience.'}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar - Audio Selection or Transcript */}
      <div className="w-full lg:w-80 bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col overflow-hidden">
        {/* Tab buttons when captions available */}
        {hasCaptions && (
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setShowCaptions(false)}
              className={`flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                !showCaptions
                  ? 'text-white bg-white/5 border-b-2 border-brand-gold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Audio Samples
            </button>
            <button
              onClick={() => setShowCaptions(true)}
              className={`flex-1 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                showCaptions
                  ? 'text-white bg-white/5 border-b-2 border-brand-gold'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Captions size={14} />
              Transcript
            </button>
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {showCaptions && hasCaptions ? (
            // Transcript View
            <div ref={captionsRef} className="space-y-3">
              {selectedItem.captions?.map((cap, index) => {
                const isActive = currentCaption === cap;
                return (
                  <button
                    key={index}
                    onClick={() => jumpToCaption(cap.start)}
                    data-active={isActive}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-brand-gold/20 border-brand-gold'
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    } border`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs text-slate-500 font-mono whitespace-nowrap pt-0.5">
                        {formatTime(cap.start)}
                      </span>
                      <div className="flex-1 min-w-0">
                        {cap.speaker && (
                          <p className={`text-xs font-semibold mb-1 ${
                            isActive ? 'text-brand-gold' : 'text-slate-400'
                          }`}>
                            {cap.speaker}
                          </p>
                        )}
                        <p className={`text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                          {cap.text}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // Audio Selection View
            <>
              {!hasCaptions && (
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                  Audio Samples
                </h3>
              )}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedIndex === index
                        ? 'bg-brand-gold/20 border-brand-gold'
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    } border`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedIndex === index ? 'bg-brand-gold/30' : 'bg-white/10'
                        }`}
                      >
                        {item.spotifyEmbedUrl ? (
                          <svg viewBox="0 0 24 24" className={`w-5 h-5 ${selectedIndex === index ? 'text-brand-gold' : 'text-slate-400'}`} fill="currentColor">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        ) : (
                          <Headphones
                            size={18}
                            className={selectedIndex === index ? 'text-brand-gold' : 'text-slate-400'}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          selectedIndex === index ? 'text-white' : 'text-slate-300'
                        }`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                        {item.duration && (
                          <p className="text-xs text-slate-600 mt-1">{item.duration}</p>
                        )}
                        {item.captions && item.captions.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-brand-gold/70">
                            <Captions size={12} />
                            <span>Transcript available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <p className="text-xs text-slate-400 text-center">
                  All audio content showcases AI-generated voices and production, demonstrating our conversational AI capabilities.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleViewer;
