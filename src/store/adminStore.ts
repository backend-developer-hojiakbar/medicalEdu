import { create } from 'zustand';
import { User, Role } from '../types';
import { mockUsers } from '../data/mockData';

interface AdminState {
  users: User[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  updateUserRole: (userId: string, role: Role) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getStats: () => {
    totalUsers: number;
    totalCourses: number;
    totalRevenue: number;
    activeEnrollments: number;
  };
}

export const useAdminStore = create<AdminState>((set, get) => ({
  users: mockUsers,
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ users: [...get().users], isLoading: false });
  },

  updateUserRole: async (userId, role) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({
      users: get().users.map(u => u.id === userId ? { ...u, role } : u),
      isLoading: false
    });
  },

  deleteUser: async (userId) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({
      users: get().users.filter(u => u.id !== userId),
      isLoading: false
    });
  },

  getStats: () => {
    const users = get().users;
    // In a real app, these would come from the backend
    return {
      totalUsers: users.length,
      totalCourses: 12, // Mock
      totalRevenue: 45000000, // Mock
      activeEnrollments: 156 // Mock
    };
  }
}));
