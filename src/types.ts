export type Role = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  specialty?: string;
  workplace?: string;
  avatar_url?: string;
  enrolled_courses?: string[];
}

export interface Category {
  id: string;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  duration_minutes: number;
  video_url: string;
  description: string;
  is_free_preview: boolean;
  materials?: Material[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category: Category;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discount_price: number | null;
  duration_minutes: number;
  lessons_count: number;
  students_count: number;
  rating: number;
  reviews_count: number;
  credits: number;
  thumbnail_url: string;
  instructor: {
    first_name: string;
    last_name: string;
    specialty: string;
    avatar_url: string;
  };
  modules: Module[];
  learning_outcomes: string[];
  requirements: string[];
}

export interface Enrollment {
  id: string;
  course_id: string;
  user_id: string;
  progress: number; // 0-100
  completed_lessons: string[];
  enrolled_at: string;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'ppt' | 'doc';
  url: string;
}

export interface Certificate {
  id: string;
  course_id: string;
  user_id: string;
  issue_date: string;
  qr_code: string;
}
