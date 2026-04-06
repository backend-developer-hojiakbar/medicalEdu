import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Search, UserPlus, MoreVertical, Shield, Mail, Trash2, Edit2, UserCheck, UserX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const { users, updateUserRole, deleteUser } = useAdminStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterRole, setFilterRole] = React.useState('all');

  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.first_name + ' ' + u.last_name).toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = async (userId: string, newRole: any) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success('Foydalanuvchi roli yangilandi');
    } catch (err) {
      toast.error('Xatolik yuz berdi');
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Haqiqatan ham ushbu foydalanuvchini o\'chirmoqchimisiz?')) {
      try {
        await deleteUser(userId);
        toast.success('Foydalanuvchi o\'chirildi');
      } catch (err) {
        toast.error('Xatolik yuz berdi');
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">Foydalanuvchilar</h1>
          <p className="text-slate-500">Jami {users.length} ta foydalanuvchi ro'yxatdan o'tgan</p>
        </div>
        <button className="btn-primary py-3 px-8 flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> Yangi foydalanuvchi
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Ism yoki email bo'yicha qidirish..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-medical-primary/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 outline-none"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">Barcha rollar</option>
            <option value="admin">Admin</option>
            <option value="instructor">O'qituvchi</option>
            <option value="student">Talaba</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Foydalanuvchi</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Rol</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Sana</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-medical-primary flex items-center justify-center font-bold text-lg">
                        {user.first_name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{user.first_name} {user.last_name}</h4>
                        <p className="text-xs text-slate-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      user.role === 'admin' ? 'bg-red-50 text-red-600' :
                      user.role === 'instructor' ? 'bg-amber-50 text-amber-600' :
                      'bg-blue-50 text-medical-primary'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" /> {user.email}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500">
                    2024-03-15
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <select 
                        className="text-xs border border-slate-100 rounded-lg p-1 outline-none"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button 
                        onClick={() => handleDelete(user.id)}
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
    </div>
  );
}
