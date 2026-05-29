import { Router, type Request, type Response } from 'express';
import { studentLogin, adminLogin, updateDummyPasswords } from '../controllers/authController.js';
import { getStudentTranscript } from '../controllers/studentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { getTigerCounseling } from '../controllers/aiController.js';

// Admin Controllers
import {
  getDashboardStats,
  getRecentStudents,
  getStudents,
  getBatches,
  getPrograms,
  getLoginAttempts,
  getGradeDistribution,
  getResults,
  getSubjects,
  getUsers,
  getSemesterSummary,
  addStudent,
  updateStudent,
  deleteStudent,
  addResult,
  deleteResult,
  deleteUser,
} from '../controllers/adminController.js';

const route = Router();

// ============ PUBLIC ROUTES ============
route.post('/auth/login', studentLogin);           // Student login (uses rollNo)
route.post('/auth/admin-login', adminLogin);       // Admin login (uses username)
route.post('/auth/update-passwords', updateDummyPasswords);
route.post('/student/counseling', authenticateToken, getTigerCounseling);

// ============ STUDENT ROUTES (Protected) ============
route.get('/student/transcript', authenticateToken, getStudentTranscript);
route.get('/student/transcript/:studentId', authenticateToken, getStudentTranscript);
route.get('/student/transcript', authenticateToken, getStudentTranscript);
route.get('/student/transcript/:studentId', authenticateToken, getStudentTranscript);

// ============ ADMIN ROUTES (Protected) ============
// Dashboard
route.get('/admin/stats', authenticateToken, getDashboardStats);
route.get('/admin/recent-students', authenticateToken, getRecentStudents);
route.get('/admin/grade-distribution', authenticateToken, getGradeDistribution);
route.get('/admin/login-attempts', authenticateToken, getLoginAttempts);

// Management
route.get('/admin/students', authenticateToken, getStudents);
route.get('/admin/batches', authenticateToken, getBatches);
route.get('/admin/programs', authenticateToken, getPrograms);
route.get('/admin/subjects', authenticateToken, getSubjects);
route.get('/admin/results', authenticateToken, getResults);
route.get('/admin/users', authenticateToken, getUsers);

// Reports
route.get('/admin/semester-summary', authenticateToken, getSemesterSummary);

// Admin Action Routes
route.post('/admin/students', authenticateToken, addStudent);
route.put('/admin/students/:id', authenticateToken, updateStudent);
route.delete('/admin/students/:id', authenticateToken, deleteStudent);
route.post('/admin/results', authenticateToken, addResult);
route.delete('/admin/results/:id', authenticateToken, deleteResult);
route.delete('/admin/users/:id', authenticateToken, deleteUser);

// Health check
route.get('/health', (req: Request, res: Response) => {
  res.json({ success: true, message: 'API is running' });
});

export default route;