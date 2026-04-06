import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourseStore } from '../store/courseStore';
import { useAuthStore } from '../store/authStore';
import { Award, Download, Share2, CheckCircle, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePDFCertificate } from '../utils/certificateGenerator';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function Certificate() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { getCourseById } = useCourseStore();
  const course = getCourseById(id || '');

  const downloadPDF = async () => {
    if (!course || !user) return;
    
    const toastId = toast.loading('Sertifikat tayyorlanmoqda...');
    try {
      const doc = await generatePDFCertificate({
        studentName: `${user.first_name} ${user.last_name}`,
        courseTitle: course.title,
        date: new Date().toLocaleDateString(),
        certificateId: `MED-${course.id}-${user.id}-${Date.now()}`,
        instructorName: `${course.instructor.first_name} ${course.instructor.last_name}`
      });
      doc.save(`sertifikat-${course.id}.pdf`);
      toast.success('Sertifikat yuklab olindi', { id: toastId });
    } catch (err) {
      toast.error('Xatolik yuz berdi', { id: toastId });
    }
  };

  if (!course || !user) return <div className="p-20 text-center">Ma'lumot topilmadi</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex p-4 bg-emerald-100 rounded-3xl mb-6">
          <Award className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-display font-black text-slate-900 mb-4">Tabriklaymiz!</h1>
        <p className="text-xl text-slate-600">Siz kursni muvaffaqiyatli yakunladingiz va sertifikatga ega bo'ldingiz.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white aspect-[1.414/1] rounded-xl shadow-2xl border-[16px] border-medical-primary p-12 relative overflow-hidden flex flex-col items-center justify-center text-center"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-medical-primary/5 -translate-x-16 -translate-y-16 rounded-full" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-medical-primary/5 translate-x-32 translate-y-32 rounded-full" />
            
            <ShieldCheck className="w-16 h-16 text-medical-primary mb-8" />
            
            <h2 className="text-5xl font-display font-black text-slate-900 mb-4 tracking-tight">SERTIFIKAT</h2>
            <p className="text-slate-500 uppercase tracking-[0.2em] text-sm mb-12">Muvaffaqiyatli yakunlanganlik haqida</p>
            
            <p className="text-xl text-slate-600 mb-2">Ushbu hujjat tasdiqlaydiki,</p>
            <h3 className="text-4xl font-display font-bold text-medical-primary mb-12 border-b-2 border-slate-100 pb-4 min-w-[300px]">
              {user.first_name} {user.last_name}
            </h3>
            
            <p className="text-lg text-slate-600 mb-2">
              <span className="font-bold text-slate-900">"{course.title}"</span>
            </p>
            <p className="text-slate-600 mb-16">kursini to'liq o'zlashtirdi va yakuniy imtihondan o'tdi.</p>
            
            <div className="flex items-end justify-between w-full mt-auto">
              <div className="text-left">
                <div className="w-32 h-px bg-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-900">MedEdu Online</p>
                <p className="text-[10px] text-slate-400">O'quv platformasi ma'muriyati</p>
              </div>
              
              <div className="bg-white p-2 border border-slate-100 rounded-lg">
                <QRCodeSVG value={`https://mededu.uz/verify/${course.id}`} size={64} />
              </div>
              
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">Sana: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6">Harakatlar</h4>
            <div className="space-y-4">
              <button 
                onClick={downloadPDF}
                className="w-full btn-primary py-4 flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" /> PDF yuklab olish
              </button>
              <button className="w-full btn-secondary py-4 flex items-center justify-center gap-3">
                <Share2 className="w-5 h-5" /> Ulashish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
