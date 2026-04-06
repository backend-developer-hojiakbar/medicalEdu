import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, BookOpen, User, LogOut, Menu, X, Bell, Globe, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: t('nav.courses'), href: '/courses', icon: BookOpen },
    { name: t('nav.about'), href: '/about', icon: Bell },
    { name: t('nav.contact'), href: '/contact', icon: Globe },
    { name: t('nav.faq'), href: '/faq', icon: Bell },
  ];

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'uz' ? 'ru' : i18n.language === 'ru' ? 'en' : 'uz';
    i18n.changeLanguage(nextLng);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-medical-primary rounded-lg group-hover:rotate-12 transition-transform">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-medical-primary tracking-tight">
                MedEdu<span className="text-medical-accent">Online</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-medical-primary flex items-center gap-2",
                  location.pathname === link.href ? "text-medical-primary" : "text-slate-600"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}

            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-medical-primary uppercase"
            >
              <Globe className="w-4 h-4" />
              {i18n.language}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="p-2 text-slate-500 hover:text-medical-primary transition-colors">
                    <Shield className="w-5 h-5" />
                  </Link>
                )}
                <Link to="/profile" className="p-2 text-slate-500 hover:text-medical-primary transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <Link to="/dashboard" className="btn-secondary py-1.5 text-sm">
                  {t('nav.dashboard')}
                </Link>
                <button onClick={() => logout()} className="p-2 text-slate-500 hover:text-red-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-medical-primary">
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="btn-primary py-2 text-sm">
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLanguage} className="text-xs font-bold text-slate-500 uppercase">
              {i18n.language}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-medical-primary focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-medical-primary hover:bg-blue-50"
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-medical-primary"
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <div className="pt-4 pb-2 border-t border-slate-100">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-slate-600"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-medical-primary"
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
