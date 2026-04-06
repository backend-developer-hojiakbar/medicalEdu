import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "MedEdu Online platformasida qanday ro'yxatdan o'tish mumkin?",
      a: "Saytning yuqori qismidagi 'Ro'yxatdan o'tish' tugmasini bosing, ism-sharifingiz, elektron pochtangiz va parolingizni kiriting. Shundan so'ng siz platformadan to'liq foydalanishingiz mumkin."
    },
    {
      q: "Kurslarni tugatgandan so'ng sertifikat beriladimi?",
      a: "Ha, har bir kursni muvaffaqiyatli yakunlaganingizdan so'ng, sizga QR-kodli professional PDF sertifikat taqdim etiladi. Uni yuklab olishingiz yoki ijtimoiy tarmoqlarda ulashishingiz mumkin."
    },
    {
      q: "To'lovlarni qanday amalga oshirish mumkin?",
      a: "Biz Payme, Click va Uzum Bank kabi o'zbekistonlik to'lov tizimlarini, shuningdek, Visa va Mastercard bank kartalarini qo'llab-quvvatlaymiz."
    },
    {
      q: "Kurslar qancha vaqt davomida ochiq bo'ladi?",
      a: "Siz sotib olgan kurslar sizning shaxsiy kabinetingizda cheksiz vaqt davomida saqlanib qoladi. Siz istalgan vaqtda darslarni qayta ko'rishingiz mumkin."
    },
    {
      q: "CME kreditlari nima va ular qanday beriladi?",
      a: "CME (Continuing Medical Education) - bu shifokorlarning doimiy malaka oshirish kreditlari. Bizning ba'zi kurslarimiz davlat tomonidan tan olingan CME kreditlarini taqdim etadi."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex p-4 bg-blue-50 rounded-3xl mb-6">
          <HelpCircle className="w-12 h-12 text-medical-primary" />
        </div>
        <h1 className="text-4xl font-display font-black text-slate-900 mb-4">Ko'p beriladigan savollar</h1>
        <p className="text-slate-600">Sizda savol bormi? Bizda javob bor.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all hover:border-medical-primary/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 flex items-center justify-between text-left"
            >
              <span className="font-bold text-slate-900 pr-8">{faq.q}</span>
              {openIndex === i ? (
                <ChevronUp className="w-5 h-5 text-medical-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <div className="pt-2 text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 bg-slate-900 rounded-[40px] text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Savolingizga javob topmadingizmi?</h3>
        <p className="text-slate-400 mb-8">Biz bilan bog'laning va biz sizga yordam beramiz.</p>
        <button className="btn-primary py-3 px-10">
          Bizga yozing
        </button>
      </div>
    </div>
  );
}
