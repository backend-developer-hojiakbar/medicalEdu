import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Stethoscope, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Noto\'g\'ri email manzili'),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      await login(data.email, data.password);
      toast.success('Xush kelibsiz!');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Xatolik yuz berdi');
      toast.error(err.message || 'Xatolik yuz berdi');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <Link to="/" className="p-3 bg-medical-primary rounded-2xl mb-4 hover:rotate-12 transition-transform">
                <Stethoscope className="w-8 h-8 text-white" />
              </Link>
              <h1 className="text-2xl font-display font-bold text-slate-900">Xush kelibsiz!</h1>
              <p className="text-slate-500">Tizimga kirish uchun ma'lumotlarni kiriting</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none"
                    placeholder="example@mededu.uz"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Parol</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 focus:border-medical-primary transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <div className="text-right">
                <Link to="/forgot-password" title="Parolni tiklash" className="text-xs font-bold text-medical-primary hover:underline">
                  Parolni unutdingizmi?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Kirish'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Hisobingiz yo'qmi?{' '}
                <Link to="/register" className="text-medical-primary font-bold hover:underline">
                  Ro'yxatdan o'ting
                </Link>
              </p>
            </div>

            <div className="mt-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-medical-accent rounded-full animate-pulse" />
                Tezkor kirish (Test):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Admin', email: 'admin@mededu.uz', role: 'Administrator' },
                  { label: 'Talaba', email: 'aziz@mededu.uz', role: 'Shifokor' },
                  { label: 'O\'qituvchi', email: 'dilshod@mededu.uz', role: 'Kardiolog' },
                  { label: 'Pediatr', email: 'nigora@mededu.uz', role: 'O\'qituvchi' },
                ].map((testUser) => (
                  <button
                    key={testUser.email}
                    type="button"
                    onClick={() => {
                      setValue('email', testUser.email);
                      setValue('password', 'admin123');
                      toast.success(`${testUser.label} ma'lumotlari to'ldirildi`, { icon: '📝', duration: 1500 });
                    }}
                    className="flex flex-col items-start p-3 bg-white border border-slate-200 rounded-xl hover:border-medical-primary hover:shadow-md transition-all group text-left"
                  >
                    <span className="text-sm font-bold text-slate-700 group-hover:text-medical-primary transition-colors">
                      {testUser.label}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate w-full">
                      {testUser.email}
                    </span>
                    <span className="mt-1 px-1.5 py-0.5 bg-slate-100 rounded text-[9px] font-medium text-slate-500 uppercase">
                      {testUser.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
