import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      nav: {
        courses: 'Kurslar',
        about: 'Biz haqimizda',
        contact: 'Aloqa',
        faq: 'FAQ',
        login: 'Kirish',
        register: 'Ro\'yxatdan o\'tish',
        dashboard: 'Kabinet',
        profile: 'Profil',
        logout: 'Chiqish'
      },
      home: {
        hero_title: 'Tibbiyotda Professional Malaka Oshirish',
        hero_subtitle: 'O\'zbekistonning yetakchi professorlaridan masofaviy ta\'lim oling.',
        start_learning: 'O\'qishni boshlash',
        stats_doctors: 'Shifokorlar',
        stats_courses: 'Kurslar',
        stats_professors: 'Professorlar'
      }
    }
  },
  ru: {
    translation: {
      nav: {
        courses: 'Курсы',
        about: 'О нас',
        contact: 'Контакты',
        faq: 'FAQ',
        login: 'Вход',
        register: 'Регистрация',
        dashboard: 'Кабинет',
        logout: 'Выход'
      },
      home: {
        hero_title: 'Профессиональное медицинское образование',
        hero_subtitle: 'Дистанционное обучение от ведущих профессоров Узбекистана.',
        start_learning: 'Начать обучение',
        stats_doctors: 'Врачей',
        stats_courses: 'Курсов',
        stats_professors: 'Профессоров'
      }
    }
  },
  en: {
    translation: {
      nav: {
        courses: 'Courses',
        about: 'About Us',
        contact: 'Contact',
        faq: 'FAQ',
        login: 'Login',
        register: 'Register',
        dashboard: 'Dashboard',
        logout: 'Logout'
      },
      home: {
        hero_title: 'Professional Medical Education',
        hero_subtitle: 'Distance learning from leading professors of Uzbekistan.',
        start_learning: 'Start Learning',
        stats_doctors: 'Doctors',
        stats_courses: 'Courses',
        stats_professors: 'Professors'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'uz',
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
