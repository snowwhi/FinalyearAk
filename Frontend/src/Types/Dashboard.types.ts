export interface Course {
  code: string;
  title: string;
  cr: number;
  marks: number;
  gp: string | number;
  grade: string;
}

export interface Semester {
  id: string;
  gpa: string;
  totalCr: number;
  courses: Course[];
}

export interface PersonalInfo {
  name: string;
  rollNo: string;
  program: string;
  university: string;
  session: string;
  docNo: string;
}

export interface Summary {
  cgpa: string;
  percentage:string | number; 
  marksObt: string | number;
  marksTotal: string;
}

export interface TranscriptRecord {
  personal: PersonalInfo;
  summary: Summary;
  semesters: Semester[];
}