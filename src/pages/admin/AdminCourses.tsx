import React from 'react';
import { useCourseStore } from '../../store/courseStore';
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, Star, Users, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

export default function AdminCourses() {
  const { courses, deleteCourse, addCourse, updateCourse } = useCourseStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCourse, setEditingCourse] = React.useState<any>(null);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Haqiqatan ham ushbu kursni o\'chirmoqchimisiz?')) {
      try {
        await deleteCourse(id);
        toast.success('Kurs o\'chirildi');
      } catch (err) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, data);
        toast.success('Kurs yangilandi');
      } else {
        await addCourse(data);
        toast.success('Yangi kurs qo\'shildi');
      }
      setIsModalOpen(false);
      setEditingCourse(null);
    } catch (err) {
      toast.error('Xatolik yuz berdi');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">Kurslar boshqaruvi</h1>
          <p className="text-slate-500">Jami {courses.length} ta kurs mavjud</p>
        </div>
        <button 
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
          className="btn-primary py-3 px-8 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Yangi kurs qo'shish
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Kurs nomi bo'yicha qidirish..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-primary/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 outline-none">
            <option>Barcha kategoriyalar</option>
            <option>Kardiologiya</option>
            <option>Pediatriya</option>
          </select>
          <select className="px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 outline-none">
            <option>Eng yangi</option>
            <option>Eng mashhur</option>
            <option>Narxi: Arzon</option>
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kurs</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kategoriya</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Narxi</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Statistika</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={course.thumbnail_url} className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                        <p className="text-xs text-slate-400">{course.instructor.first_name} {course.instructor.last_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-blue-50 text-medical-primary rounded-full text-xs font-bold">
                      {course.category.name.uz}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-slate-900">{course.price.toLocaleString()} so'm</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> {course.students_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {course.rating}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setEditingCourse(course);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-medical-primary hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">
                  {editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <MoreVertical className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Kurs nomi</label>
                  <input 
                    name="title"
                    defaultValue={editingCourse?.title}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none"
                    placeholder="Masalan: Kardiologiya asoslari"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Narxi (so'm)</label>
                    <input 
                      name="price"
                      type="number"
                      defaultValue={editingCourse?.price}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Davomiyligi (daqiqa)</label>
                    <input 
                      name="duration_minutes"
                      type="number"
                      defaultValue={editingCourse?.duration_minutes}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tavsif</label>
                  <textarea 
                    name="description"
                    defaultValue={editingCourse?.description}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none resize-none"
                  />
                </div>
                <div className="flex justify-end gap-4 pt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-3 px-8">Bekor qilish</button>
                  <button type="submit" className="btn-primary py-3 px-10">Saqlash</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
