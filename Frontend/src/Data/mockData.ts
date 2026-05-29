// This file ONLY contains:
// 1. TypeScript type definitions
// 2. Navigation items (static UI)
// 3. NO mock data for API calls — everything is fetched from database

export type Page = 'dashboard' | 'students' | 'results' | 'batches' | 'subjects' | 'users' | 'reports';

// Navigation items (static — just for UI)
export const navItems: { icon: string; label: string; page: Page }[] = [
  { icon: 'ri-dashboard-3-line',  label: 'Dashboard', page: 'dashboard' },
  { icon: 'ri-user-3-line',       label: 'Students',  page: 'students'  },
  { icon: 'ri-file-list-3-line',  label: 'Results',   page: 'results'   },
  { icon: 'ri-group-line',        label: 'Batches',   page: 'batches'   },
  { icon: 'ri-book-open-line',    label: 'Subjects',  page: 'subjects'  },
  { icon: 'ri-shield-user-line',  label: 'Users',     page: 'users'     },
  { icon: 'ri-bar-chart-2-line',  label: 'Reports',   page: 'reports'   },
];

// TypeScript interfaces (no mock data — just for type safety)
export interface Student {
  id: number;
  name: string;
  rollNo: string;
  program: string;
  batch: string;
  cgpa: string;
  status: 'active' | 'warning' | 'graduated';
}

export interface Batch {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  durationYears: number;
  status: string;
}

export interface Program {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  code: string;
  title: string;
  program: string;
  semester: number;
  creditHours: number;
}

export interface Result {
  id: number;
  studentRollNo: string;
  studentName: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  marks: number;
  gradePoints: string;
  grade: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginAttempt {
  email: string;
  attempts: number;
  lastAttempt: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeBatches: number;
  totalSubjects: number;
  resultsEntered: number;
  programsCount: number;
}

export interface GradeDistribution {
  grade: string;
  count: number;
  percentage: number;
}

export interface SemesterSummary {
  studentName: string;
  rollNo: string;
  semester1: string;
  semester2: string;
  semester3: string;
  semester4: string;
  semester5: string;
  semester6: string;
  semester7: string;
  cgpa: string;
}
