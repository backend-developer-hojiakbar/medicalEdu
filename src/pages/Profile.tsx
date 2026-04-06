import React from 'react';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Shield, Calendar, Edit2, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = React.useState(false);
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
    }
  });

  const onSubmit = async (data: any) => {
    try {
      await updateProfile(data);
      toast.success('Profil yangilandi');
      setIsEditing(false);
    } catch (err) {
      toast.error('Xatolik yuz berdi');
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden">
        <div className="h-48 bg-medical-primary relative">
          <div className="absolute -bottom-16 left-10 p-2 bg-white rounded-[32px] shadow-lg">
            <div className="w-32 h-32 bg-slate-100 rounded-[24px] flex items-center justify-center text-4xl font-black text-medical-primary border-4 border-white">
              {user.first_name[0]}{user.last_name[0]}
            </div>
          </div>
        </div>
        
        <div className="pt-20 p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-display font-black text-slate-900">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-slate-500">Tizimdagi rolingiz: <span className="font-bold text-medical-primary uppercase">{user.role}</span></p>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary py-2 px-6 flex items-center gap-2"
            >
              {isEditing ? 'Bekor qilish' : <><Edit2 className="w-4 h-4" /> Tahrirlash</>}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4" /> Ism
                </label>
                <input 
                  {...register('first_name')}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4" /> Familiya
                </label>
                <input 
                  {...register('last_name')}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input 
                  {...register('email')}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Rol
                </label>
                <input 
                  value={user.role}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none"
                />
              </div>
            </div>

            {isEditing && (
              <div className="md:col-span-2 pt-6 border-t border-slate-100">
                <button type="submit" className="btn-primary py-4 px-10 flex items-center gap-2">
                  <Save className="w-5 h-5" /> Saqlash
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
