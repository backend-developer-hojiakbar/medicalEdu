import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, GraduationCap, Video, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCourseStore } from '../store/courseStore';
import CourseCard from '../components/CourseCard';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { courses } = useCourseStore();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-medical-primary text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                Sog'liqni saqlash vazirligi tomonidan tasdiqlangan
              </div>
              <h1 className="text-5xl lg:text-6xl font-display font-black text-slate-900 leading-tight mb-6">
                {t('home.hero_title')}
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {t('home.hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
                  {t('home.start_learning')} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/register" className="btn-secondary py-4 px-8 text-lg flex items-center justify-center">
                  {t('nav.register')}
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <div className="text-2xl font-bold text-slate-900">15,000+</div>
                  <div className="text-sm text-slate-500">{t('home.stats_doctors')}</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">120+</div>
                  <div className="text-sm text-slate-500">{t('home.stats_courses')}</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">45+</div>
                  <div className="text-sm text-slate-500">{t('home.stats_professors')}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                  alt="Medical Education"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg z-20 flex items-center gap-3 animate-bounce">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-bold">QR Sertifikat</div>
                  <div className="text-xs text-slate-400">Avtomatik shakllanadi</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Ommabop Kurslar</h2>
              <p className="text-slate-600">Eng ko'p o'rganilayotgan va yuqori baholangan kurslar</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-2 text-medical-primary font-bold hover:gap-3 transition-all">
              Barcha kurslar <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
