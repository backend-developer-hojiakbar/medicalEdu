import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Xabaringiz yuborildi! Tez orada siz bilan bog\'lanamiz.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 mb-6">
            Biz bilan bog'laning
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Savollaringiz bormi yoki hamkorlik qilmoqchimisiz? Biz har doim muloqotga tayyormiz.
          </p>

          <div className="space-y-8">
            {[
              { icon: Phone, title: 'Telefon', value: '+998 71 200 00 00', sub: 'Dushanba-Juma, 9:00-18:00' },
              { icon: Mail, title: 'Email', value: 'info@mededu.uz', sub: 'Istalgan vaqtda yozing' },
              { icon: MapPin, title: 'Manzil', value: 'Toshkent sh., Yunusobod tumani, 12-mavze', sub: 'Bizning bosh ofisimiz' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-medical-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-lg text-slate-700">{item.value}</p>
                  <p className="text-sm text-slate-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
            <div className="flex items-center gap-4 mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              <h4 className="font-bold text-slate-900">Telegram orqali bog'lanish</h4>
            </div>
            <p className="text-sm text-slate-600 mb-6">Tezkor javob olish uchun bizning botimizga yozishingiz mumkin.</p>
            <a href="#" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
              @mededu_support_bot
            </a>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Xabar yuborish</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Ismingiz</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none"
                  placeholder="Ali"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Familiyangiz</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none"
                  placeholder="Valiyev"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email manzilingiz</label>
              <input 
                required
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none"
                placeholder="ali@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Xabar matni</label>
              <textarea 
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-primary/20 outline-none resize-none"
                placeholder="Savolingizni shu yerda qoldiring..."
              />
            </div>
            <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Yuborish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
