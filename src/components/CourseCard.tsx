import React from 'react';
import { Star, Users, Clock, ChevronRight } from 'lucide-react';
import { Course } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-medical-primary text-xs font-bold rounded-full shadow-sm">
            {course.category.name.uz}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-bold text-slate-700">{course.rating}</span>
          <span className="text-xs text-slate-400">({course.reviews_count} sharh)</span>
        </div>

        <h3 className="text-lg font-display font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-medical-primary transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration_minutes} daqiqa
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.students_count} talaba
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-lg font-bold text-medical-primary">
            {course.price.toLocaleString()} so'm
          </span>
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center gap-1 text-sm font-bold text-medical-accent hover:gap-2 transition-all"
          >
            Batafsil <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
