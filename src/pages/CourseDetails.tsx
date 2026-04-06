import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import { useEnrollmentStore } from '../store/enrollmentStore';
import { Play, FileText, CheckCircle, Clock, Users, Star, ChevronRight, PlayCircle, Award } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { getCourseById } = useCourseStore();
  const { getEnrollment } = useEnrollmentStore();
  
  const course = getCourseById(id || '');
  const enrollment = getEnrollment(id || '', user?.id || '');

  if (!course) return <div className="p-20 text-center">Kurs topilmadi</div>;

  const isEnrolled = !!enrollment;

  const handleBuyClick = () => {
    console.log('Buy button clicked', { isAuthenticated, isEnrolled, courseId: course.id });
    if (!isAuthenticated) {
      toast.error('Iltimos, avval tizimga kiring');
      navigate('/login');
      return;
    }
    if (isEnrolled) {
      navigate(`/learn/${course.id}`);
      return;
    }
    navigate(`/checkout/${course.id}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header / Hero */}
      <div className="bg-medical-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                  {course.category.name.uz}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">{course.rating}</span>
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-black mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {course.students_count} talaba o'rganmoqda
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Davomiyligi: {course.duration_minutes} daqiqa
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Kreditlar: {course.credits} CME
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                <div className="relative aspect-video">
                  <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-medical-primary fill-medical-primary ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-3xl font-black text-slate-900 mb-6">
                    {course.price.toLocaleString()} so'm
                  </div>
                  <button 
                    onClick={handleBuyClick}
                    className="w-full btn-primary py-4 text-lg mb-4"
                  >
                    {isEnrolled ? 'O\'qishni davom ettirish' : 'Kursni sotib olish'}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    30 kunlik pulni qaytarish kafolati
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Kurs dasturi</h2>
              <div className="space-y-6">
                {course.modules.map((module, i) => (
                  <div key={module.id}>
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-50 text-medical-primary rounded flex items-center justify-center text-xs">{i+1}</span>
                      {module.title}
                    </h3>
                    <div className="space-y-3 pl-8">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-all">
                          <div className="flex items-center gap-3">
                            <PlayCircle className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700">{lesson.title}</span>
                          </div>
                          <span className="text-xs text-slate-400">{lesson.duration_minutes} daqiqa</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">O'qituvchi haqida</h2>
              <div className="flex items-center gap-6">
                <img src={course.instructor.avatar_url} className="w-20 h-20 rounded-2xl object-cover" />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{course.instructor.first_name} {course.instructor.last_name}</h4>
                  <p className="text-medical-primary font-medium mb-2">{course.instructor.specialty}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Tibbiyot fanlari doktori, Professor. 20 yillik tajribaga ega mutaxassis.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
             <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-6">Nimalarni o'rganasiz?</h3>
                <ul className="space-y-4">
                  {course.learning_outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle className="w-5 h-5 text-medical-accent flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
