import React from 'react';
import { useCourseStore } from '../store/courseStore';
import CourseCard from '../components/CourseCard';
import { Search, Filter } from 'lucide-react';

export default function Courses() {
  const { courses, categories } = useCourseStore();
  const [search, setSearch] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryId === 'all' || course.category.id === categoryId;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Kurslar Katalogi</h1>
          <p className="text-slate-600">O'zingizga mos yo'nalishni tanlang va o'qishni boshlang</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Kurs qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none appearance-none bg-white"
            >
              <option value="all">Barchasi</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name.uz}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500">Hech qanday kurs topilmadi</p>
        </div>
      )}
    </div>
  );
}
