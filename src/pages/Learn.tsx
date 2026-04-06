import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import { useEnrollmentStore } from '../store/enrollmentStore';
import { Play, FileText, CheckCircle, ChevronLeft, ChevronRight, Menu, X, Award, Video, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import ReactPlayer from 'react-player';
import toast from 'react-hot-toast';

export default function Learn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getCourseById } = useCourseStore();
  const { updateProgress, getEnrollment } = useEnrollmentStore();
  
  const course = getCourseById(id || '');
  const enrollment = getEnrollment(id || '', user?.id || '');
  
  const [currentLessonIndex, setCurrentLessonIndex] = React.useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  if (!course) return <div className="p-20 text-center">Kurs topilmadi</div>;
  if (!enrollment) return <div className="p-20 text-center">Siz ushbu kursga a'zo emassiz</div>;

  // Flatten lessons from modules
  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons[currentLessonIndex];

  const handleLessonComplete = (shouldNavigate: boolean = false) => {
    if (user && currentLesson) {
      updateProgress(course.id, user.id, currentLesson.id, allLessons.length);
      toast.success('Dars yakunlandi!');
      
      if (shouldNavigate) {
        // Check if this was the last lesson
        const isLastLesson = currentLessonIndex === allLessons.length - 1;
        if (isLastLesson) {
          toast.success('Kursni muvaffaqiyatli yakunladingiz!', { icon: '🎓' });
          navigate(`/certificate/${course.id}`);
        } else {
          setCurrentLessonIndex(prev => prev + 1);
        }
      }
    }
  };

  if (!currentLesson) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <div className="p-4 bg-blue-50 rounded-2xl mb-6">
          <Video className="w-12 h-12 text-medical-primary" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Darslar topilmadi</h2>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Kabinetga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-slate-900">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white h-full border-r border-slate-200 flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-display font-bold text-slate-900 truncate">{course.title}</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-2">
              {allLessons.map((lesson, i) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLessonIndex(i)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 group",
                    currentLessonIndex === i 
                      ? "bg-blue-50 border-medical-primary/20 border" 
                      : "hover:bg-slate-50 border border-transparent"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0",
                    currentLessonIndex === i ? "bg-medical-primary text-white" : "bg-slate-100 text-slate-500"
                  )}>
                    {i + 1}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className={cn(
                      "text-sm font-bold truncate",
                      currentLessonIndex === i ? "text-medical-primary" : "text-slate-700"
                    )}>
                      {lesson.title}
                    </p>
                    <span className="text-[10px] text-slate-400">{lesson.duration_minutes} daqiqa</span>
                  </div>
                  {enrollment.completed_lessons.includes(lesson.id) && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0 bg-slate-50">
        <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 mr-4">
              <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-medical-primary h-full transition-all" style={{ width: `${enrollment.progress}%` }} />
              </div>
              <span className="text-[10px] font-bold text-slate-400">{enrollment.progress}%</span>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-sm font-bold text-medical-primary hover:underline"
            >
              Chiqish
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6 lg:p-10">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-8">
              {currentLesson?.video_url ? (
                <ReactPlayer
                  src={currentLesson.video_url}
                  width="100%"
                  height="100%"
                  controls
                  onEnded={() => handleLessonComplete(false)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white bg-slate-800">
                  Video mavjud emas
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-grow">
                <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">
                  {currentLesson.title}
                </h1>
                <div className="prose prose-slate max-w-none text-slate-600 mb-10">
                  <p>{currentLesson.description}</p>
                </div>

                {enrollment.progress === 100 && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 mb-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-emerald-100 rounded-2xl">
                        <Award className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Kurs yakunlandi!</h3>
                        <p className="text-sm text-slate-500">Sertifikatingiz tayyor</p>
                      </div>
                    </div>
                    <Link to={`/certificate/${course.id}`} className="btn-accent py-3 px-8 inline-block">
                      Sertifikatni olish
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <button
            disabled={currentLessonIndex === 0}
            onClick={() => setCurrentLessonIndex(prev => prev - 1)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" /> Oldingi
          </button>
          <button
            onClick={() => handleLessonComplete(true)}
            className="flex items-center gap-2 text-sm font-bold text-medical-primary"
          >
            {currentLessonIndex === allLessons.length - 1 ? 'Yakunlash' : 'Keyingi'} 
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
