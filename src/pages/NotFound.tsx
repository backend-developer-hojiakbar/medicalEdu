import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8">
        <AlertCircle className="w-12 h-12" />
      </div>
      <h1 className="text-6xl font-display font-black text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-6">Sahifa topilmadi</h2>
      <p className="text-slate-500 max-w-md mb-10">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan bo'lishi mumkin.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn-primary py-3 px-8 flex items-center gap-2">
          <Home className="w-5 h-5" /> Bosh sahifa
        </Link>
        <Link to="/courses" className="btn-secondary py-3 px-8 flex items-center gap-2">
          <Search className="w-5 h-5" /> Kurslarni qidirish
        </Link>
      </div>
    </div>
  );
}
