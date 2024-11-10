// CoursesMapping.js
import * as LessonsEN from './lessonseng';
import * as LessonsRU from './Lessons';
import * as LessonDataScienceRU from "./Data Science for beginners/Ru";
import * as LessonDataScienceEN from "./Data Science for beginners/En";
import * as LessonUXResearchRU from "./Introduction to UX Research/Ru";
import * as LessonUXResearchEN from "./Introduction to UX Research/En";
import * as LessonProductAnalyticsRU from "./Product Analytics for beginners/Ru";
import * as LessonProductAnalyticsEN from "./Product Analytics for beginners/En";

// Маппинг курсов по языкам
export const courseMappings = {
  ru: {
    2925675: LessonsRU, // Курс по TON блокчейну - русская версия
    2930629: LessonProductAnalyticsRU, // Product Analytics for Beginners - русская версия
    2930630: LessonUXResearchRU, // Introduction to UX Research - русская версия
    2930631: LessonDataScienceRU, // Data Science for Beginners - русская версия
  },
  en: {
    2925675: LessonsEN, // Курс по TON блокчейну - английская версия
    2930629: LessonProductAnalyticsEN, // Product Analytics for Beginners - английская версия
    2930630: LessonUXResearchEN, // Introduction to UX Research - английская версия
    2930631: LessonDataScienceEN, // Data Science for Beginners - английская версия
  }
};