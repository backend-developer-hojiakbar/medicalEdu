import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useCourseStore } from '../../store/courseStore';
import { Users, BookOpen, DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Yan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Iyun', revenue: 2390, users: 3800 },
  { name: 'Iyul', revenue: 3490, users: 4300 },
];

export default function AdminDashboard() {
  const { getStats } = useAdminStore();
  const { courses } = useCourseStore();
  const stats = getStats();

  const cards = [
    { title: 'Jami foydalanuvchilar', value: stats.totalUsers, icon: Users, color: 'blue', trend: '+12%' },
    { title: 'Jami kurslar', value: courses.length, icon: BookOpen, color: 'emerald', trend: '+2' },
    { title: 'Jami tushum', value: `${(stats.totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'amber', trend: '+8.4%' },
    { title: 'Faol o\'quvchilar', value: stats.activeEnrollments, icon: TrendingUp, color: 'purple', trend: '+15.2%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-black text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Platformaning umumiy statistikasi va tahlili</p>
        </div>
        <button className="btn-primary py-2 px-6 flex items-center gap-2">
          <Calendar className="w-4 h-4" /> Oxirgi 30 kun
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-${card.color}-50 flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${card.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {card.trend} {card.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">{card.title}</h3>
            <p className="text-2xl font-black text-slate-900">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Tushumlar dinamikasi</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1E40AF" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Foydalanuvchilar o'sishi</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Oxirgi ro'yxatdan o'tganlar</h3>
          <button className="text-medical-primary font-bold text-sm hover:underline">Barchasini ko'rish</button>
        </div>
        <div className="divide-y divide-slate-50">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                  U{i}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Foydalanuvchi {i}</h4>
                  <p className="text-sm text-slate-500">user{i}@example.com</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">Bugun, 14:20</p>
                <p className="text-xs text-slate-400">Toshkent, UZ</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
