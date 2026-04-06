import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true, isLoading: false });
        } else {
          set({ isLoading: false });
          throw new Error('Email yoki parol noto\'g\'ri');
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          email: userData.email || '',
          role: 'student',
          enrolled_courses: [],
          ...userData
        };
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      logout: async () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (data) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...data } });
        }
      }
    }),
    {
      name: 'mededu-auth-storage',
    }
  )
);
