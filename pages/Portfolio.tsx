import React, { useState } from 'react';
import {
  BookOpen,
  Video,
  Headphones,
  GraduationCap,
  Play,
  FileText,
  ArrowRight,
  Filter,
  Eye,
  Sparkles
} from 'lucide-react';
import { PageView } from '../types';
import { SampleViewer } from '../components/SampleViewer';

interface PortfolioProps {
  onNavigate: (page: PageView) => void;
}

type FilterType = 'all' | 'ebook' | 'video' | 'audio' | 'course';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: FilterType;
  thumbnail: string | null;
  comingSoon: boolean;
  beforeFormat?: string;
  afterFormat?: string;
  duration?: string;
  previewUrl?: string;
  sampleType?: 'video' | 'ebook' | 'pdf' | 'course' | 'audio';
  sampleContent?: any;
  badge?: string;
  qualityNote?: string;
}

const portfolioItems: PortfolioItem[] = [
  // Real samples
  {
    id: 'video-math',
    title: 'Interactive Math Videos',
    description: 'OpenStax textbook content transformed into engaging video lessons with extracted source images for maximum accuracy.',
    type: 'video',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/interactive-math-video.jpg',
    comingSoon: false,
    beforeFormat: 'PDF Textbook',
    afterFormat: 'AI Video Lessons',
    duration: 'Multiple formats',
    badge: 'Live Demo',
    sampleType: 'video',
    sampleContent: {
      type: 'video',
      src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/videos/Add-and-Subtract-Integers-Regular-Video.html'
    }
  },
  {
    id: 'video-persona',
    title: 'Persona-Based Learning',
    description: 'Dynamic video generation that adapts to learner personas, creating personalized educational content on the fly.',
    type: 'video',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/personabasedlearning.jpg',
    comingSoon: false,
    beforeFormat: 'Static Content',
    afterFormat: 'Adaptive Videos',
    duration: 'Personalized',
    badge: 'AI-Powered',
    sampleType: 'video',
    sampleContent: {
      type: 'video',
      src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/videos/Multiply-And-Divide-Integers-Video-Game-Persona.html'
    }
  },
  {
    id: 'ebook-anatomy',
    title: 'Interactive Anatomy eBook',
    description: 'Split-screen experience combining custom interactive learning on the left with the original source PDF on the right.',
    type: 'ebook',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/interactiveanatomyebook.jpg',
    comingSoon: false,
    beforeFormat: 'PDF Document',
    afterFormat: 'Interactive Experience',
    badge: 'Live Demo',
    sampleType: 'ebook',
    sampleContent: {
      type: 'ebook',
      src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/ebook/anatomical-terminology-ebook.html'
    }
  },
  {
    id: 'pdf-devotionals',
    title: 'Multi-Language Publications',
    description: 'Beautiful devotional books generated in multiple languages, ready for Amazon KDP and Vital Source distribution.',
    type: 'ebook',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/books.jpg',
    comingSoon: false,
    beforeFormat: 'Raw Content',
    afterFormat: 'Print-Ready PDFs',
    badge: 'Multi-Language',
    sampleType: 'pdf',
    sampleContent: {
      type: 'pdf',
      items: [
        {
          title: 'Tiny Monsters Devotional',
          language: 'English',
          src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/pdfs/Tiny_MonstersDevotional.pdf'
        },
        {
          title: 'Pequeños Monstros Devocional',
          language: 'Spanish',
          src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/pdfs/PequenosMonstros-Devocional.pdf'
        },
        {
          title: 'Intrepid Animals',
          language: 'English',
          src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/pdfs/Intrepid_Animals.pdf'
        },
        {
          title: 'Dinosaurios KDP',
          language: 'Spanish',
          src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/pdfs/Dinosaurios-KDP-Print.pdf'
        }
      ]
    }
  },
  {
    id: 'course-entrepreneurship',
    title: '7-Week Entrepreneurship Course',
    description: 'Our baseline course tier: AI-generated audio, responsive design, and full accessibility. Even our starting point delivers a complete, professional learning experience.',
    type: 'course',
    thumbnail: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/thumbnails/enterprenurshipcourse.jpg',
    comingSoon: false,
    beforeFormat: 'OneDrive Files',
    afterFormat: 'Full LMS Course',
    duration: '7 weeks of content',
    badge: 'Baseline Tier',
    qualityNote: 'This represents our entry-level course quality. ADA compliant, responsive, generated in days not months.',
    sampleType: 'course',
    sampleContent: {
      type: 'course',
      basePath: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course',
      weeks: [
        {
          number: 1,
          title: 'Foundation & Vision',
          locked: false,
          lessons: [
            { id: '1-1', title: 'Lesson 1.1', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-1-1.html' },
            { id: '1-2', title: 'Lesson 1.2', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-1-2.html' },
            { id: '1-3', title: 'Lesson 1.3', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-1-3.html' },
            { id: '1-4', title: 'Lesson 1.4', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-1-4.html' }
          ]
        },
        {
          number: 2,
          title: 'Market Research',
          locked: true,
          lessons: [
            { id: '2-1', title: 'Lesson 2.1', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-2-1.html' },
            { id: '2-2', title: 'Lesson 2.2', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-2-2.html' },
            { id: '2-3', title: 'Lesson 2.3', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-2-3.html' },
            { id: '2-4', title: 'Lesson 2.4', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-2-4.html' }
          ]
        },
        {
          number: 3,
          title: 'Business Model',
          locked: true,
          lessons: [
            { id: '3-1', title: 'Lesson 3.1', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-3-1.html' },
            { id: '3-2', title: 'Lesson 3.2', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-3-2.html' },
            { id: '3-3', title: 'Lesson 3.3', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-3-3.html' },
            { id: '3-4', title: 'Lesson 3.4', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-3-4.html' }
          ]
        },
        {
          number: 4,
          title: 'Product Development',
          locked: true,
          lessons: [
            { id: '4-1', title: 'Lesson 4.1', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-4-1.html' },
            { id: '4-2', title: 'Lesson 4.2', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-4-2.html' },
            { id: '4-3', title: 'Lesson 4.3', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-4-3.html' },
            { id: '4-4', title: 'Lesson 4.4', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-4-4.html' }
          ]
        },
        {
          number: 5,
          title: 'Marketing Strategy',
          locked: true,
          lessons: [
            { id: '5-1', title: 'Lesson 5.1', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-5-1.html' },
            { id: '5-2', title: 'Lesson 5.2', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-5-2.html' },
            { id: '5-3', title: 'Lesson 5.3', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-5-3.html' },
            { id: '5-4', title: 'Lesson 5.4', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-5-4.html' }
          ]
        },
        {
          number: 6,
          title: 'Finance & Funding',
          locked: true,
          lessons: [
            { id: '6-1', title: 'Lesson 6.1', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-6-1.html' },
            { id: '6-2', title: 'Lesson 6.2', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-6-2.html' },
            { id: '6-3', title: 'Lesson 6.3', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-6-3.html' },
            { id: '6-4', title: 'Lesson 6.4', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-6-4.html' }
          ]
        },
        {
          number: 7,
          title: 'Launch & Scale',
          locked: true,
          lessons: [
            { id: '7-1', title: 'Lesson 7.1', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-7-1.html' },
            { id: '7-2', title: 'Lesson 7.2', src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/course/lessons/lesson-7-2.html' }
          ]
        }
      ]
    }
  },
  // Audio samples
  {
    id: 'audio-conversational',
    title: 'Conversational AI Experiences',
    description: 'Live AI interviews and AI-generated podcasts showcasing our conversational AI capabilities for educational content.',
    type: 'audio',
    thumbnail: null,
    comingSoon: false,
    beforeFormat: 'Raw Content',
    afterFormat: 'AI Audio',
    badge: 'Live Demo',
    sampleType: 'audio',
    sampleContent: {
      type: 'audio',
      items: [
        {
          id: 'ai-interview',
          title: 'Live AI Interview',
          description: 'Unedited real-time AI interview demonstrating conversational AI capabilities. Pauses and delays showcase the authentic live experience.',
          src: 'https://pub-e5994fd168b34b10b119b4228ec3bf11.r2.dev/samples/ConversationalAI/AIInterview.wav',
          duration: '~5 min',
          captions: [
            { start: 0, end: 9.22, text: "Welcome to the show, folks. I'm your host, Alexa, bringing you the latest and greatest" },
            { start: 9.22, end: 16.62, text: "in, well, interesting topics. Today, we're diving into the topic on everyone's mind." },
            { start: 16.62, end: 23.56, text: "Is AI making us dumber? And to help me unravel this complex issue, I've got the brilliant" },
            { start: 23.56, end: 31.5, text: "Geo joining me today. Geo, it's a pleasure to have you. Now Geo, let's start with the" },
            { start: 31.5, end: 37.26, text: "big question. With all this AI doing all the work for us, are we actually becoming less" },
            { start: 37.26, end: 51.26, text: "capable? It depends. So I always say that AI is making the smart smarter and the dumb dumber." },
            { start: 51.26, end: 58.12, text: "And what I mean by that is that basically, it's all about how you're using it. And those" },
            { start: 58.12, end: 64.88, text: "who want to use it for taking it easy, you know, for example, completing an assignment" },
            { start: 64.88, end: 70.84, text: "quickly, or just getting things done, without using the brains. They're going to be able" },
            { start: 70.84, end: 82.92, text: "to do that. But they are missing out really what AI can give us." },
            { start: 82.92, end: 89.34, text: "That's a very insightful perspective. So you're saying that the key is how we choose to utilize" },
            { start: 89.34, end: 94.66, text: "these tools. Do you think it will create an even wider gap between those who embrace" },
            { start: 94.66, end: 101.78, text: "it for deeper learning and those who use it for pure convenience? Oh, yeah, for sure. I do believe" },
            { start: 101.78, end: 109.26, text: "that those who truly use AI in the right way and leverage their critical thinking and leverage" },
            { start: 109.26, end: 116.9, text: "AI as a way to be more creative, not only be more productive, but more creative, learn" },
            { start: 116.9, end: 122.84, text: "more and do more. There is going to be a gap that's going to be stretching farther apart" },
            { start: 122.84, end: 134.2, text: "from those who are just simply using it as a tool to get things done. That's a bit" },
            { start: 134.2, end: 141.96, text: "concerning. So do you think this AI divide will potentially lead to even more societal" },
            { start: 141.96, end: 150.08, text: "inequality down the line? Yeah, I would. But not only that, really, you know, the way" },
            { start: 150.08, end: 158.72, text: "I look at AI is, for example, in the U.S. I come from Colombia, South America. My first" },
            { start: 158.72, end: 164.6, text: "language is Spanish. I came here. I had to learn English. So now I have two languages." },
            { start: 164.6, end: 172.52, text: "AI is the next language we all have to learn. So we have to become bilingual and really learn" },
            { start: 172.52, end: 186.12, text: "this, between quotes, language to be proficient, to be effective, and don't lag behind." },
            { start: 186.12, end: 191.44, text: "That's a really interesting way to look at it, viewing AI proficiency as a new language" },
            { start: 191.44, end: 198.88, text: "to learn. Now, as we start to wrap up, do you have any final thoughts on whether AI is" },
            { start: 198.88, end: 206.44, text: "truly making us dumber? Or is it just changing the way we learn and think?" },
            { start: 206.44, end: 212.56, text: "So it is not making us dumber if you do it right. If you're using it right, if you're" },
            { start: 212.56, end: 218.96, text: "really exploring it as you're kind of, I'm going to call it partner in crime in the sense" },
            { start: 218.96, end: 224.84, text: "that it can really help you do things that you didn't do before. For example, I know we" },
            { start: 224.84, end: 230.24, text: "had ideas about apps and things and I had to rely on developers to do those. Now, at least" },
            { start: 230.24, end: 237.48, text: "I am able to create prototypes and be able to run solutions that before I couldn't. And" },
            { start: 237.48, end: 243.56, text: "I can have the assistance from AI. I can also brainstorm about many ideas and many things" },
            { start: 243.56, end: 250.16, text: "that I'm doing. And that helps me not only to be more productive, but also more creative." },
            { start: 250.16, end: 255.92, text: "And I've been learning in the last two years 10 times more than what I have done in the" },
            { start: 255.92, end: 269.68, text: "last 10 years because of how effective I'm using AI to help me with all those things." },
            { start: 269.68, end: 275.28, text: "That's a really positive way to end things. So you believe that AI can be a powerful" },
            { start: 275.28, end: 281.92, text: "tool for growth and innovation if we approach it with the right mindset. Thank you so much," },
            { start: 281.92, end: 287.36, text: "Gio, for sharing your valuable insights with us today. And thank you to all of our listeners" },
            { start: 287.36, end: 293.6, text: "for tuning in. We'll catch you next time on whatever we're talking about today. Have a great day" },
            { start: 293.6, end: 298.24, text: "and keep those critical thinking muscles working. Thank you." }
          ]
        },
        {
          id: 'ai-podcast',
          title: 'AI-Generated Podcast',
          description: 'Transforming Higher Education with AI-Ready Content - A fully AI-generated podcast episode from script to voices to production.',
          spotifyEmbedUrl: 'https://open.spotify.com/embed/episode/237x5iKQGaC1fc3IfjG1MH?utm_source=generator&theme=0',
          duration: '~20 min'
        }
      ]
    }
  }
];

const filterOptions: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'All Work', icon: Filter },
  { value: 'ebook', label: 'eBooks & PDFs', icon: BookOpen },
  { value: 'video', label: 'Videos', icon: Video },
  { value: 'audio', label: 'Audio', icon: Headphones },
  { value: 'course', label: 'Courses', icon: GraduationCap }
];

const getTypeColor = (type: FilterType): string => {
  switch (type) {
    case 'ebook': return '#38bdf8';
    case 'video': return '#d946ef';
    case 'audio': return '#f59e0b';
    case 'course': return '#ff4d6d';
    default: return '#94a3b8';
  }
};

const getTypeIcon = (type: FilterType): React.ElementType => {
  switch (type) {
    case 'ebook': return BookOpen;
    case 'video': return Video;
    case 'audio': return Headphones;
    case 'course': return GraduationCap;
    default: return FileText;
  }
};

export const Portfolio: React.FC<PortfolioProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.type === activeFilter);

  const scrollToContact = () => {
    onNavigate('home');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const openSample = (item: PortfolioItem) => {
    if (!item.comingSoon && item.sampleContent) {
      setSelectedItem(item);
      setViewerOpen(true);
    }
  };

  const closeSample = () => {
    setViewerOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-space">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]" aria-hidden="true" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 rounded-full text-brand-gold text-sm font-semibold mb-6">
              <Sparkles size={16} />
              Interactive Samples Available
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Our Work
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              See how we transform content into engaging learning experiences. Each project showcases our commitment to quality, beauty, and accessibility.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-y border-white/5 sticky top-[72px] z-40 bg-space/95 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={`px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-space ${
                    isActive
                      ? 'bg-white text-space shadow-lg'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <option.icon size={16} />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16" aria-labelledby="portfolio-heading">
        <div className="container mx-auto px-6">
          <h2 id="portfolio-heading" className="sr-only">Portfolio Items</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              const typeColor = getTypeColor(item.type);
              const isInteractive = !item.comingSoon && item.sampleContent;

              return (
                <article
                  key={item.id}
                  className={`group bg-white/[0.02] border rounded-2xl overflow-hidden transition-all ${
                    isInteractive
                      ? 'border-white/20 hover:border-white/40 cursor-pointer hover:shadow-lg hover:shadow-white/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => isInteractive && openSample(item)}
                >
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-video"
                    style={{
                      background: item.thumbnail ? undefined : `linear-gradient(135deg, ${typeColor}15, transparent)`
                    }}
                  >
                    {/* Thumbnail Image */}
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}

                    {/* Overlay for interactive items with thumbnail */}
                    {item.thumbnail && !item.comingSoon && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${typeColor}90` }}
                        >
                          {item.type === 'video' ? (
                            <Play size={28} className="text-white ml-1" />
                          ) : (
                            <Eye size={28} className="text-white" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Fallback for items without thumbnail */}
                    {!item.thumbnail && item.comingSoon && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${typeColor}20` }}
                        >
                          {item.type === 'video' ? (
                            <Play size={28} style={{ color: typeColor }} className="ml-1" />
                          ) : (
                            <TypeIcon size={28} style={{ color: typeColor }} />
                          )}
                        </div>
                        <span className="text-slate-500 text-sm">Sample Coming Soon</span>
                      </div>
                    )}

                    {!item.thumbnail && !item.comingSoon && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${typeColor}30` }}
                        >
                          {item.type === 'video' ? (
                            <Play size={32} style={{ color: typeColor }} className="ml-1" />
                          ) : item.type === 'course' ? (
                            <GraduationCap size={32} style={{ color: typeColor }} />
                          ) : item.type === 'audio' ? (
                            <Headphones size={32} style={{ color: typeColor }} />
                          ) : (
                            <Eye size={32} style={{ color: typeColor }} />
                          )}
                        </div>
                        <span className="text-white text-sm font-semibold group-hover:text-white/90">
                          Click to Preview
                        </span>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${typeColor}20`,
                        color: typeColor
                      }}
                    >
                      <TypeIcon size={12} />
                      {item.type}
                    </div>

                    {/* Live Demo Badge */}
                    {item.badge && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-brand-gold/90 text-black">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Transformation Info */}
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-1 bg-white/5 rounded text-slate-400">
                        {item.beforeFormat}
                      </span>
                      <ArrowRight size={14} className="text-slate-600" />
                      <span
                        className="px-2 py-1 rounded font-medium"
                        style={{
                          backgroundColor: `${typeColor}15`,
                          color: typeColor
                        }}
                      >
                        {item.afterFormat}
                      </span>
                    </div>

                    {item.duration && (
                      <div className="mt-3 text-xs text-slate-500">
                        {item.duration}
                      </div>
                    )}

                    {/* Quality Note - for baseline tier indication */}
                    {item.qualityNote && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-brand-gold text-xs">!</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {item.qualityNote}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400">No items found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-3xl md:text-4xl font-black text-brand-gold mb-2">5+</div>
              <div className="text-sm text-slate-400">Live Samples</div>
            </div>
            <div className="text-center p-6 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-3xl md:text-4xl font-black text-brand-purple mb-2">28</div>
              <div className="text-sm text-slate-400">Course Lessons</div>
            </div>
            <div className="text-center p-6 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-3xl md:text-4xl font-black text-brand-cyan mb-2">4</div>
              <div className="text-sm text-slate-400">Languages</div>
            </div>
            <div className="text-center p-6 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-3xl md:text-4xl font-black text-brand-red mb-2">&lt;1</div>
              <div className="text-sm text-slate-400">Week to Build</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Your content could be our next showcase piece. Let's transform it together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="px-8 py-4 bg-brand-red text-white font-bold rounded-xl shadow-[0_0_30px_rgba(255,77,109,0.3)] hover:shadow-[0_0_40px_rgba(255,77,109,0.5)] transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-space"
              >
                Get Started
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-space flex items-center gap-2"
              >
                View Services <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Viewer Modal */}
      {selectedItem && selectedItem.sampleContent && (
        <SampleViewer
          isOpen={viewerOpen}
          onClose={closeSample}
          type={selectedItem.sampleType!}
          title={selectedItem.title}
          description={selectedItem.description}
          content={selectedItem.sampleContent}
        />
      )}
    </div>
  );
};
