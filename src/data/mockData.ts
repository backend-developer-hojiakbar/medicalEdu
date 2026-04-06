import { User, Course, Category } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', first_name: 'Admin', last_name: 'MedEdu', email: 'admin@mededu.uz', role: 'admin', avatar_url: 'https://i.pravatar.cc/150?u=admin' },
  { id: 'u2', first_name: 'Aziz', last_name: 'Rahimov', email: 'aziz@mededu.uz', role: 'student', avatar_url: 'https://i.pravatar.cc/150?u=aziz', enrolled_courses: ['c1', 'c2'] },
  { id: 'u3', first_name: 'Dilshod', last_name: 'Axmedov', email: 'dilshod@mededu.uz', role: 'instructor', specialty: 'Kardiologiya', avatar_url: 'https://i.pravatar.cc/150?u=dilshod' },
  { id: 'u4', first_name: 'Malika', last_name: 'Saidova', email: 'malika@mededu.uz', role: 'instructor', specialty: 'Nevrologiya', avatar_url: 'https://i.pravatar.cc/150?u=malika' },
  { id: 'u5', first_name: 'Nigora', last_name: 'Usmonova', email: 'nigora@mededu.uz', role: 'instructor', specialty: 'Pediatriya', avatar_url: 'https://i.pravatar.cc/150?u=nigora' },
  { id: 'u6', first_name: 'Jasur', last_name: 'Rahmonov', email: 'jasur@mededu.uz', role: 'instructor', specialty: 'Xirurgiya', avatar_url: 'https://i.pravatar.cc/150?u=jasur' },
  { id: 'u7', first_name: 'Elena', last_name: 'Petrova', email: 'elena@mededu.uz', role: 'instructor', specialty: 'Dermatologiya', avatar_url: 'https://i.pravatar.cc/150?u=elena' },
  { id: 'u8', first_name: 'Gulnoza', last_name: 'Orifova', email: 'gulnoza@mededu.uz', role: 'instructor', specialty: 'Ginekologiya', avatar_url: 'https://i.pravatar.cc/150?u=gulnoza' },
  { id: 'u9', first_name: 'Botir', last_name: 'Qodirov', email: 'botir@mededu.uz', role: 'instructor', specialty: 'Gastroenterologiya', avatar_url: 'https://i.pravatar.cc/150?u=botir' },
  { id: 'u10', first_name: 'Sardor', last_name: 'Olimov', email: 'sardor@mededu.uz', role: 'instructor', specialty: 'Pulmonologiya', avatar_url: 'https://i.pravatar.cc/150?u=sardor' },
];

export const mockCategories: Category[] = [
  { id: 'cat1', name: { uz: 'Kardiologiya', ru: 'Кардиология', en: 'Cardiology' } },
  { id: 'cat2', name: { uz: 'Nevrologiya', ru: 'Неврология', en: 'Neurology' } },
  { id: 'cat3', name: { uz: 'Pediatriya', ru: 'Педиатрия', en: 'Pediatrics' } },
  { id: 'cat4', name: { uz: 'Xirurgiya', ru: 'Хирургия', en: 'Surgery' } },
  { id: 'cat5', name: { uz: 'Dermatologiya', ru: 'Дерматология', en: 'Dermatology' } },
  { id: 'cat6', name: { uz: 'Ginekologiya', ru: 'Гинекология', en: 'Gynecology' } },
  { id: 'cat7', name: { uz: 'Gastroenterologiya', ru: 'Гастроэнтерология', en: 'Gastroenterology' } },
  { id: 'cat8', name: { uz: 'Pulmonologiya', ru: 'Пульмонология', en: 'Pulmonology' } },
  { id: 'cat9', name: { uz: 'Endokrinologiya', ru: 'Эндокринология', en: 'Endocrinology' } },
  { id: 'cat10', name: { uz: 'Psixiatriya', ru: 'Психиатрия', en: 'Psychiatry' } },
];

const createMockCourse = (id: number, title: string, price: number, category: Category, instructorName: string = 'Alisher Karimov'): Course => ({
  id: `c${id}`,
  title,
  description: `${title} bo'yicha professional kurs. Zamonaviy diagnostika va davolash usullari, klinik holatlar tahlili.`,
  full_description: `${title} bo'yicha chuqurlashtirilgan o'quv dasturi. Ushbu kursda siz sohadagi eng so'nggi xalqaro protokollar, diagnostika algoritmlari va amaliy ko'nikmalarni o'rganasiz. Kurs tajribali mutaxassislar tomonidan ishlab chiqilgan va xalqaro standartlarga javob beradi.`,
  category,
  level: id % 3 === 0 ? 'advanced' : (id % 2 === 0 ? 'intermediate' : 'beginner'),
  price,
  discount_price: price > 300000 ? Math.round(price * 0.85) : Math.round(price * 0.95),
  duration_minutes: 480 + (id * 30),
  lessons_count: 10 + (id % 5),
  students_count: 100 + (id * 25),
  rating: Number((4.5 + (Math.random() * 0.5)).toFixed(1)),
  reviews_count: 20 + (id * 5),
  credits: 12,
  thumbnail_url: `https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&sig=${id}`,
  instructor: {
    first_name: instructorName.split(' ')[0],
    last_name: instructorName.split(' ')[1],
    specialty: category.name.uz,
    avatar_url: `https://i.pravatar.cc/150?u=${instructorName.replace(' ', '')}`
  },
  modules: [
    {
      id: `m${id}-1`,
      title: 'Kirish va Nazariy Asoslar',
      lessons: [
        { id: `l${id}-1`, title: 'Mavzuning dolzarbligi va kirish', duration_minutes: 45, video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Ushbu darsda mavzuning zamonaviy tibbiyotdagi o\'rni haqida gaplashamiz.', is_free_preview: true },
        { id: `l${id}-2`, title: 'Anatomiya va Fiziologiya asoslari', duration_minutes: 60, video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Sohaga oid fundamental bilimlar tahlili.', is_free_preview: false },
      ]
    },
    {
      id: `m${id}-2`,
      title: 'Diagnostika va Tekshiruv Usullari',
      lessons: [
        { id: `l${id}-3`, title: 'Laborator diagnostika', duration_minutes: 50, video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Asosiy tahlillar va ularning talqini.', is_free_preview: false },
        { id: `l${id}-4`, title: 'Instrumental tekshiruvlar (UZI, MRT, KT)', duration_minutes: 75, video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Vizualizatsiya usullari va ularning ahamiyati.', is_free_preview: false },
      ]
    },
    {
      id: `m${id}-3`,
      title: 'Davolash va Reabilitatsiya',
      lessons: [
        { id: `l${id}-5`, title: 'Farmakoterapiya asoslari', duration_minutes: 60, video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Dori vositalari va ularning qo\'llanilishi.', is_free_preview: false },
        { id: `l${id}-6`, title: 'Klinik holatlar tahlili', duration_minutes: 90, video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', description: 'Real hayotiy misollar yordamida bilimni mustahkamlash.', is_free_preview: false },
      ]
    }
  ],
  learning_outcomes: [
    'Zamonaviy diagnostika usullarini o\'zlashtirish',
    'Xalqaro davolash protokollarini qo\'llash',
    'Klinik holatlarni mustaqil tahlil qilish',
    'Differensial diagnostika ko\'nikmalari',
    'Bemorlar bilan ishlashda zamonaviy yondashuvlar'
  ],
  requirements: ['Tibbiy oliy ma\'lumot yoki yuqori kurs talabasi bo\'lish', 'Bazaviy fiziologiya bilimlari', 'Ingliz tilini bilish (tavsiya etiladi)']
});

export const mockCourses: Course[] = [
  createMockCourse(1, 'Kardiologiya: EKG tahlili va talqini', 350000, mockCategories[0], 'Dilshod Axmedov'),
  createMockCourse(2, 'Nevrologiya: Insultdan keyingi reabilitatsiya', 420000, mockCategories[1], 'Malika Saidova'),
  createMockCourse(3, 'Pediatriya: Chaqaloqlar parvarishi va kasalliklari', 280000, mockCategories[2], 'Nigora Usmonova'),
  createMockCourse(4, 'Xirurgiya: Laparoskopik operatsiyalar texnikasi', 550000, mockCategories[3], 'Jasur Rahmonov'),
  createMockCourse(5, 'Dermatologiya: Akne va uning zamonaviy terapiyasi', 300000, mockCategories[4], 'Elena Petrova'),
  createMockCourse(6, 'Ginekologiya: Reproduktiv salomatlik asoslari', 380000, mockCategories[5], 'Gulnoza Orifova'),
  createMockCourse(7, 'Gastroenterologiya: Oshqozon-ichak kasalliklari', 320000, mockCategories[6], 'Botir Qodirov'),
  createMockCourse(8, 'Pulmonologiya: Surunkali o\'pka kasalliklari', 340000, mockCategories[7], 'Sardor Olimov'),
  createMockCourse(9, 'Endokrinologiya: Qandli diabet va uni boshqarish', 360000, mockCategories[8], 'Zulfiya To\'rayeva'),
  createMockCourse(10, 'Psixiatriya: Depressiya va xavotir buzilishlari', 310000, mockCategories[9], 'Anvar Soliyev'),
  createMockCourse(11, 'Kardiologiya: Arterial gipertenziya boshqaruvi', 330000, mockCategories[0], 'Dilshod Axmedov'),
  createMockCourse(12, 'Nevrologiya: Epilepsiya diagnostikasi', 400000, mockCategories[1], 'Malika Saidova'),
  createMockCourse(13, 'Pediatriya: Bolalarda yuqumli kasalliklar', 290000, mockCategories[2], 'Nigora Usmonova'),
  createMockCourse(14, 'Xirurgiya: Shoshilinch jarrohlik yordami', 480000, mockCategories[3], 'Jasur Rahmonov'),
  createMockCourse(15, 'Dermatologiya: Psoriaz va ekzema', 310000, mockCategories[4], 'Elena Petrova'),
  createMockCourse(16, 'Ginekologiya: Homiladorlikni rejalashtirish', 350000, mockCategories[5], 'Gulnoza Orifova'),
  createMockCourse(17, 'Gastroenterologiya: Gepatitlar diagnostikasi', 370000, mockCategories[6], 'Botir Qodirov'),
  createMockCourse(18, 'Pulmonologiya: Bronxial astma terapiyasi', 340000, mockCategories[7], 'Sardor Olimov'),
  createMockCourse(19, 'Endokrinologiya: Qalqonsimon bez kasalliklari', 330000, mockCategories[8], 'Zulfiya To\'rayeva'),
  createMockCourse(20, 'Psixiatriya: Bolalar psixologiyasi asoslari', 320000, mockCategories[9], 'Anvar Soliyev'),
];
