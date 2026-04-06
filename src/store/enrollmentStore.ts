import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Enrollment } from '../types';

interface EnrollmentState {
  enrollments: Enrollment[];
  enroll: (courseId: string, userId: string) => Promise<void>;
  updateProgress: (courseId: string, userId: string, lessonId: string, totalLessons: number) => void;
  getEnrollment: (courseId: string, userId: string) => Enrollment | undefined;
}

export const useEnrollmentStore = create<EnrollmentState>()(
  persist(
    (set, get) => ({
      enrollments: [],

      enroll: async (courseId, userId) => {
        const existing = get().enrollments.find(e => e.course_id === courseId && e.user_id === userId);
        if (existing) return;

        const newEnrollment: Enrollment = {
          id: Math.random().toString(36).substr(2, 9),
          course_id: courseId,
          user_id: userId,
          progress: 0,
          completed_lessons: [],
          enrolled_at: new Date().toISOString()
        };

        set({ enrollments: [...get().enrollments, newEnrollment] });
      },

      updateProgress: (courseId, userId, lessonId, totalLessons) => {
        set({
          enrollments: get().enrollments.map(e => {
            if (e.course_id === courseId && e.user_id === userId) {
              const completed = e.completed_lessons.includes(lessonId) 
                ? e.completed_lessons 
                : [...e.completed_lessons, lessonId];
              
              const progress = Math.min(Math.round((completed.length / totalLessons) * 100), 100);
              
              return { ...e, completed_lessons: completed, progress };
            }
            return e;
          })
        });
      },

      getEnrollment: (courseId, userId) => {
        return get().enrollments.find(e => e.course_id === courseId && e.user_id === userId);
      }
    }),
    {
      name: 'mededu-enrollment-storage',
    }
  )
);
