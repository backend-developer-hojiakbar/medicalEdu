import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Kurslar', href: '/admin/courses', icon: BookOpen },
    { name: 'Foydalanuvchilar', href: '/admin/users', icon: Users },
    { name: 'Sozlamalar', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-slate-900 text-white transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className={cn("font-display font-black text-xl transition-all", !isSidebarOpen && "hidden")}>
            MedEdu<span className="text-medical-accent">Admin</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-medical-primary text-white shadow-lg shadow-medical-primary/20" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "group-hover:text-white")} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                {isActive && isSidebarOpen && (
                  <motion.div layoutId="active-pill" className="ml-auto">
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className={cn("flex items-center gap-3 mb-6 px-2", !isSidebarOpen && "justify-center")}>
            <div className="w-10 h-10 rounded-xl bg-medical-primary flex items-center justify-center font-bold text-lg">
              {user?.first_name[0]}
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center gap-4 p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-grow transition-all duration-300 min-h-screen",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
