import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useCourseStore } from '../store/courseStore';
import { useEnrollmentStore } from '../store/enrollmentStore';
import { useTranslation } from 'react-i18next';
import { Book, Award, Clock, ChevronRight, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { courses } = useCourseStore();
  const { enrollments } = useEnrollmentStore();
  
  const userEnrollments = enrollments.filter(e => e.user_id === user?.id);
  const enrolledCourses = courses.filter(c => userEnrollments.some(e => e.course_id === c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">
          Salom, {user?.first_name}! 👋
        </h1>
        <p className="text-slate-600">O'quv jarayoningizni shu yerdan boshqarishingiz mumkin.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Mening kurslarim', value: userEnrollments.length.toString(), icon: Book, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Sertifikatlar', value: userEnrollments.filter(e => e.progress === 100).length.toString(), icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'O\'rtacha o\'zlashtirish', value: userEnrollments.length > 0 ? `${Math.round(userEnrollments.reduce((acc, e) => acc + e.progress, 0) / userEnrollments.length)}%` : '0%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", stat.bg)}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Davom ettirish</h2>
            <Link to="/courses" className="text-sm font-bold text-medical-primary hover:underline">
              Barcha kurslar
            </Link>
          </div>

          <div className="space-y-6">
            {enrolledCourses.length > 0 ? enrolledCourses.map(course => {
              const enrollment = userEnrollments.find(e => e.course_id === course.id);
              return (
                <div key={course.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-32 sm:h-auto overflow-hidden">
                      <img src={course.thumbnail_url} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-medical-primary px-2 py-0.5 bg-blue-50 rounded-full">
                          {course.category.name.uz}
                        </span>
                        <span className="text-xs text-slate-400">{enrollment?.progress}% tugatildi</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">{course.title}</h3>
                      
                      <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
                        <div className="bg-medical-primary h-full transition-all" style={{ width: `${enrollment?.progress}%` }} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration_minutes} daqiqa</span>
                          <span className="flex items-center gap-1"><Book className="w-3 h-3" /> {enrollment?.completed_lessons.length}/{course.lessons_count} dars</span>
                        </div>
                        {enrollment?.progress === 100 ? (
                          <Link to={`/certificate/${course.id}`} className="btn-accent py-2 px-6 text-sm">
                            Sertifikatni olish
                          </Link>
                        ) : (
                          <Link to={`/learn/${course.id}`} className="btn-primary py-2 px-6 text-sm">
                            Davom etish
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 mb-4">Sizda hali kurslar yo'q</p>
                <Link to="/courses" className="btn-secondary py-2 px-6 text-sm inline-block">Kurslarni ko'rish</Link>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tadbirlar</h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="space-y-6">
                {[
                  { title: 'Vebinar: Kardiologiya yangiliklari', date: '12 Aprel, 15:00', icon: Calendar },
                  { title: 'Yangi kurs: Pediatriya asoslari', date: '15 Aprel', icon: Book },
                ].map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                      <event.icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{event.title}</h4>
                      <p className="text-xs text-slate-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
