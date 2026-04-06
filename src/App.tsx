import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Certificate from './pages/Certificate';
import Checkout from './pages/Checkout';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCourses from './pages/admin/AdminCourses';
import AdminUsers from './pages/admin/AdminUsers';
import NotFound from './pages/NotFound';
import './i18n';

// Protected Route Component
function ProtectedRoute({ children, roles }: { children: React.ReactNode, roles?: string[] }) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/" />;

  return <>{children}</>;
}

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-medical-bg">
      <Toaster position="top-center" />
      {!isAdminPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/learn/:id" element={
            <ProtectedRoute>
              <Learn />
            </ProtectedRoute>
          } />
          
          <Route path="/checkout/:id" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          
          <Route path="/certificate/:id" element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<div className="p-10 text-center">Sozlamalar (Tez kunda)</div>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {!isAdminPage && (
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <span className="text-2xl font-display font-bold text-white mb-4 block">
                  MedEdu<span className="text-medical-accent">Online</span>
                </span>
                <p className="max-w-xs mb-6">
                  Tibbiyot xodimlari uchun professional masofaviy malaka oshirish platformasi.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Platforma</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/courses" className="hover:text-white transition-colors">Kurslar</Link></li>
                  <li><Link to="/register" className="hover:text-white transition-colors">Ro'yxatdan o'tish</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">Biz haqimizda</Link></li>
                  <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Yordam</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/contact" className="hover:text-white transition-colors">Bog'lanish</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
              © 2026 MedEdu Online. Barcha huquqlar himoyalangan.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
