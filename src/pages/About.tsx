import React from 'react';
import { Shield, Target, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-medical-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-white mb-6"
          >
            MedEdu Online Haqida
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Bizning maqsadimiz - O'zbekistondagi har bir tibbiyot xodimiga zamonaviy va sifatli ta'lim olish imkoniyatini yaratishdir.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6">Bizning Missiyamiz</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Tibbiyot doimiy rivojlanib borayotgan soha. Biz shifokorlar va hamshiralarga o'z ish joylaridan ajralmagan holda, eng so'nggi tibbiy bilimlar va texnologiyalarni o'zlashtirishlariga yordam beramiz.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-3xl">
                <div className="text-3xl font-black text-medical-primary mb-2">10k+</div>
                <div className="text-sm text-slate-500">Faol foydalanuvchilar</div>
              </div>
              <div className="p-6 bg-emerald-50 rounded-3xl">
                <div className="text-3xl font-black text-emerald-600 mb-2">50+</div>
                <div className="text-sm text-slate-500">Ekspert professorlar</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
              alt="Medical Team" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4">
                <Award className="w-10 h-10 text-medical-accent" />
                <div>
                  <div className="font-bold text-slate-900">Sifatli Ta'lim</div>
                  <div className="text-sm text-slate-500">Xalqaro standartlar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Bizning Qadriyatlarimiz</h2>
            <p className="text-slate-600">Biz har bir qadamimizda ushbu tamoyillarga tayanamiz</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Ishonchlilik', desc: 'Barcha kurslarimiz soha mutaxassislari va professorlar tomonidan tasdiqlangan.', icon: Shield },
              { title: 'Innovatsiya', desc: 'Ta\'lim jarayonida eng zamonaviy texnologiyalar va metodikalardan foydalanamiz.', icon: Target },
              { title: 'Hamjamiyat', desc: 'Biz shifokorlar o\'rtasida tajriba almashish uchun platforma yaratamiz.', icon: Users },
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-medical-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
