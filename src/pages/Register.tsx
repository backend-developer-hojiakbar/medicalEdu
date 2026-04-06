import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Stethoscope, Mail, Lock, User as UserIcon, Loader2, AlertCircle, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  first_name: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'),
  last_name: z.string().min(2, 'Familiya kamida 2 ta belgidan iborat bo\'lishi kerak'),
  email: z.string().email('Noto\'g\'ri email manzili'),
  specialty: z.string().min(2, 'Mutaxassislikni kiriting'),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Parollar mos kelmadi",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const { register: registerUser, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError(null);
      await registerUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        specialty: data.specialty,
        role: 'student'
      });
      toast.success('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
      toast.error(err.message || 'Xatolik yuz berdi');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <Link to="/" className="p-3 bg-medical-primary rounded-2xl mb-4 hover:rotate-12 transition-transform">
                <Stethoscope className="w-8 h-8 text-white" />
              </Link>
              <h1 className="text-2xl font-display font-bold text-slate-900">Ro'yxatdan o'tish</h1>
              <p className="text-slate-500 text-center">MedEdu Online platformasiga a'zo bo'ling</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Ism</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register('first_name')}
                      type="text"
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none text-sm"
                      placeholder="Aziz"
                    />
                  </div>
                  {errors.first_name && <p className="mt-1 text-[10px] text-red-500">{errors.first_name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Familiya</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      {...register('last_name')}
                      type="text"
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none text-sm"
                      placeholder="Rahimov"
                    />
                  </div>
                  {errors.last_name && <p className="mt-1 text-[10px] text-red-500">{errors.last_name.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none text-sm"
                    placeholder="example@mededu.uz"
                  />
                </div>
                {errors.email && <p className="mt-1 text-[10px] text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mutaxassislik</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('specialty')}
                    type="text"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none text-sm"
                    placeholder="Masalan: Kardiolog"
                  />
                </div>
                {errors.specialty && <p className="mt-1 text-[10px] text-red-500">{errors.specialty.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Parol</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none text-sm"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-[10px] text-red-500">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Parolni tasdiqlang</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none text-sm"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-[10px] text-red-500">{errors.confirmPassword.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ro\'yxatdan o\'tish'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Hisobingiz bormi?{' '}
                <Link to="/login" className="text-medical-primary font-bold hover:underline">
                  Kirish
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
