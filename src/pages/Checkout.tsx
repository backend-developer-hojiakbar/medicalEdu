import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import { useEnrollmentStore } from '../store/enrollmentStore';
import { CreditCard, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getCourseById } = useCourseStore();
  const { enroll } = useEnrollmentStore();
  
  const course = getCourseById(id || '');
  const [step, setStep] = React.useState<'select' | 'processing' | 'success'>('select');
  const [paymentMethod, setPaymentMethod] = React.useState<string | null>(null);

  if (!course) return <div className="p-20 text-center">Kurs topilmadi</div>;
  if (!user) return <div className="p-20 text-center">Iltimos, avval tizimga kiring</div>;

  const handlePayment = async () => {
    if (!paymentMethod) return;
    setStep('processing');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      await enroll(course.id, user.id);
      toast.success('To\'lov muvaffaqiyatli!');
      setStep('success');
    } catch (err) {
      toast.error('To\'lovda xatolik yuz berdi');
      setStep('select');
    }
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <h1 className="text-3xl font-display font-black text-slate-900 mb-4">To'lov muvaffaqiyatli!</h1>
        <p className="text-slate-600 mb-8">
          Tabriklaymiz! Siz "{course.title}" kursiga muvaffaqiyatli a'zo bo'ldingiz. Endi o'qishni boshlashingiz mumkin.
        </p>
        <div className="flex flex-col gap-3">
          <Link to={`/learn/${course.id}`} className="btn-primary py-4">
            O'qishni boshlash
          </Link>
          <Link to="/dashboard" className="btn-secondary py-4">
            Kabinetga o'tish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-medical-primary mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Orqaga qaytish
      </button>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">To'lov usulini tanlang</h1>
          
          <div className="space-y-4">
            {[
              { id: 'payme', name: 'Payme', icon: 'https://cdn.payme.uz/logo/payme_color.svg' },
              { id: 'click', name: 'Click', icon: 'https://click.uz/static/img/logo.png' },
              { id: 'uzum', name: 'Uzum Bank', icon: 'https://uzum.uz/static/img/favicon.ico' },
              { id: 'card', name: 'Bank kartasi (Visa/Mastercard)', icon: null, lucide: CreditCard }
            ].map((method) => (
              <label 
                key={method.id}
                className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === method.id 
                    ? 'border-medical-primary bg-blue-50' 
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  className="sr-only" 
                  onChange={() => setPaymentMethod(method.id)}
                />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden p-2">
                    {method.icon ? (
                      <img src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                    ) : (
                      <method.lucide className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <span className="font-bold text-slate-900">{method.name}</span>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === method.id ? 'border-medical-primary bg-medical-primary' : 'border-slate-200'
                }`}>
                  {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-900 mb-6">Buyurtma tafsilotlari</h3>
            <div className="flex gap-4 mb-6">
              <img src={course.thumbnail_url} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2">{course.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{course.instructor.first_name} {course.instructor.last_name}</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-6 border-t border-slate-100 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Kurs narxi</span>
                <span className="font-bold text-slate-900">{course.price.toLocaleString()} so'm</span>
              </div>
              <div className="flex justify-between text-lg font-black pt-3 border-t border-slate-100">
                <span className="text-slate-900">Jami:</span>
                <span className="text-medical-primary">{course.price.toLocaleString()} so'm</span>
              </div>
            </div>

            <button
              disabled={!paymentMethod || step === 'processing'}
              onClick={handlePayment}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2"
            >
              {step === 'processing' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> To'lov qilinmoqda...
                </>
              ) : (
                `To'lov qilish`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
