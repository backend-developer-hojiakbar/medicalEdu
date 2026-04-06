import { create } from 'zustand';
import { Course, Category } from '../types';
import { mockCourses, mockCategories } from '../data/mockData';

interface CourseState {
  courses: Course[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  getCourseById: (id: string) => Course | undefined;
  addCourse: (course: Partial<Course>) => Promise<void>;
  updateCourse: (id: string, course: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: mockCourses,
  categories: mockCategories,
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ courses: [...get().courses], isLoading: false });
  },

  getCourseById: (id) => {
    return get().courses.find(c => c.id === id);
  },

  addCourse: async (courseData) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      title: courseData.title || '',
      description: courseData.description || '',
      thumbnail_url: courseData.thumbnail_url || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      price: courseData.price || 0,
      rating: 0,
      students_count: 0,
      duration_minutes: courseData.duration_minutes || 0,
      credits: courseData.credits || 0,
      category: courseData.category || mockCategories[0],
      instructor: courseData.instructor || { id: '1', first_name: 'Admin', last_name: 'User', specialty: 'General', avatar_url: '' },
      modules: courseData.modules || [],
      learning_outcomes: courseData.learning_outcomes || [],
      ...courseData
    } as Course;
    set({ courses: [newCourse, ...get().courses], isLoading: false });
  },

  updateCourse: async (id, courseData) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      courses: get().courses.map(c => c.id === id ? { ...c, ...courseData } : c),
      isLoading: false
    });
  },

  deleteCourse: async (id) => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      courses: get().courses.filter(c => c.id !== id),
      isLoading: false
    });
  }
}));
