import type { Request, Response } from 'express';
import { getPool } from '../connections/connectToDB.js';

// ============ DASHBOARD STATS ============
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const pool = getPool();

    const [totalStudents] = await pool.query(`SELECT COUNT(*) as count FROM students`);
    const [activeBatches] = await pool.query(`SELECT COUNT(*) as count FROM batches WHERE status = 'active'`);
    const [totalSubjects] = await pool.query(`SELECT COUNT(*) as count FROM subjects`);
    const [resultsEntered] = await pool.query(`SELECT COUNT(*) as count FROM semester_results`);
    const [programsCount] = await pool.query(`SELECT COUNT(*) as count FROM programs`);

    res.json({
      success: true,
      data: {
        totalStudents: (totalStudents as any[])[0].count,
        activeBatches: (activeBatches as any[])[0].count,
        totalSubjects: (totalSubjects as any[])[0].count,
        resultsEntered: (resultsEntered as any[])[0].count,
        programsCount: (programsCount as any[])[0].count,
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
};

// ============ RECENT STUDENTS ============
export const getRecentStudents = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const limit = parseInt(req.query.limit as string) || 6;

    const [students] = await pool.query(
      `SELECT s.student_id as id, s.student_name as name, s.student_roll_no as rollNo,
              p.program_name as program,
              COALESCE(ss.gpa, '0.00') as cgpa,
              CASE WHEN COALESCE(ss.gpa, 0) >= 2.0 THEN 'active' ELSE 'warning' END as status
       FROM students s
       JOIN programs p ON s.program_id = p.program_id
       LEFT JOIN (
         SELECT student_id, AVG(gpa) as gpa
         FROM semester_summary
         GROUP BY student_id
       ) ss ON s.student_id = ss.student_id
       ORDER BY s.student_id DESC
       LIMIT ?`,
      [limit]
    );

    res.json({ success: true, data: students });
  } catch (error) {
    console.error('Error fetching recent students:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
};

// ============ ALL STUDENTS (with filters) ============
export const getStudents = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const { program, search } = req.query;

    let query = `
      SELECT s.student_id as id, s.student_name as name, s.student_roll_no as rollNo,
             p.program_name as program, b.batch_name as batch,
             COALESCE(ss.cgpa, '0.00') as cgpa,
             CASE WHEN COALESCE(ss.cgpa, 0) >= 2.0 THEN 'active' ELSE 'warning' END as status
      FROM students s
      JOIN programs p ON s.program_id = p.program_id
      JOIN batches b ON s.batch_id = b.batch_id
      LEFT JOIN (
        SELECT student_id, AVG(gpa) as cgpa
        FROM semester_summary
        GROUP BY student_id
      ) ss ON s.student_id = ss.student_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (program && program !== 'All') {
      query += ` AND p.program_name = ?`;
      params.push(program);
    }

    if (search) {
      query += ` AND (s.student_name LIKE ? OR s.student_roll_no LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY s.student_roll_no ASC`;

    const [students] = await pool.query(query, params);

    res.json({ success: true, data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch students' });
  }
};

// ============ ALL BATCHES ============
export const getBatches = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [batches] = await pool.query(
      `SELECT batch_id as id, batch_name as name, start_year as startYear,
              end_year as endYear, duration_years as durationYears, status
       FROM batches
       ORDER BY start_year DESC`
    );

    res.json({ success: true, data: batches });
  } catch (error) {
    console.error('Error fetching batches:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch batches' });
  }
};

// ============ ALL PROGRAMS ============
export const getPrograms = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [programs] = await pool.query(`SELECT program_id as id, program_name as name FROM programs`);

    res.json({ success: true, data: programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch programs' });
  }
};

// ============ LOGIN ATTEMPTS ============
export const getLoginAttempts = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [attempts] = await pool.query(
      `SELECT email, attempts,
              DATE_FORMAT(last_attempt, '%b %d, %Y at %h:%i %p') as lastAttempt
       FROM login_attempts
       ORDER BY last_attempt DESC
       LIMIT 10`
    );

    res.json({ success: true, data: attempts });
  } catch (error) {
    console.error('Error fetching login attempts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch login attempts' });
  }
};

// ============ GRADE DISTRIBUTION ============
export const getGradeDistribution = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const semester = req.query.semester || 5;

    const [grades] = await pool.query(
      `SELECT grade_letter as grade, COUNT(*) as count
       FROM semester_results
       WHERE semester_number = ?
       GROUP BY grade_letter
       ORDER BY FIELD(grade_letter, 'A', 'B', 'C', 'D', 'F')`,
      [semester]
    );

    const total = (grades as any[]).reduce((sum, g) => sum + g.count, 0);
    const data = (grades as any[]).map(g => ({
      grade: g.grade,
      count: g.count,
      percentage: total > 0 ? Math.round((g.count / total) * 100) : 0
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching grade distribution:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch grade distribution' });
  }
};

// ============ RESULTS (with filters) ============
export const getResults = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const { semester, program, search } = req.query;

    let query = `
      SELECT sr.result_entry_id as id,
             s.student_roll_no as studentRollNo,
             s.student_name as studentName,
             sub.course_code as subjectCode,
             sub.subject_name as subjectName,
             sr.semester_number as semester,
             sr.marks_obtained as marks,
             sr.grade_point_total as gradePoints,
             sr.grade_letter as grade,
             DATE_FORMAT(sr.updated_at, '%b %d, %Y') as updatedAt
      FROM semester_results sr
      JOIN students s ON sr.student_id = s.student_id
      JOIN subjects sub ON sr.subject_id = sub.subject_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (semester) {
      query += ` AND sr.semester_number = ?`;
      params.push(semester);
    }

    if (program && program !== 'All') {
      query += ` AND sub.program_id = (SELECT program_id FROM programs WHERE program_name = ?)`;
      params.push(program);
    }

    if (search) {
      query += ` AND (s.student_name LIKE ? OR s.student_roll_no LIKE ? OR sub.course_code LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY s.student_roll_no ASC, sub.course_code ASC LIMIT 100`;

    const [results] = await pool.query(query, params);

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch results' });
  }
};

// ============ ALL SUBJECTS ============
export const getSubjects = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [subjects] = await pool.query(
      `SELECT sub.subject_id as id, sub.course_code as code, sub.subject_name as title,
              p.program_name as program,
              COALESCE(MAX(sr.semester_number), 1) as semester,
              3 as creditHours
       FROM subjects sub
       JOIN programs p ON sub.program_id = p.program_id
       LEFT JOIN semester_results sr ON sub.subject_id = sr.subject_id
       GROUP BY sub.subject_id
       ORDER BY p.program_name, sub.course_code`
    );

    res.json({ success: true, data: subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subjects' });
  }
};

// ============ ALL USERS ============
export const getUsers = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const [users] = await pool.query(
      `SELECT user_id as id, username, email, role,
              DATE_FORMAT(created_at, '%b %d, %Y') as createdAt
       FROM users
       ORDER BY username ASC`
    );

    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// ============ SEMESTER SUMMARY (for reports) ============
export const getSemesterSummary = async (req: Request, res: Response) => {
  try {
    const pool = getPool();
    const { program, batch } = req.query;

    let query = `
      SELECT s.student_name as studentName, s.student_roll_no as rollNo,
             MAX(CASE WHEN ss.semester_number = 1 THEN ss.gpa END) as semester1,
             MAX(CASE WHEN ss.semester_number = 2 THEN ss.gpa END) as semester2,
             MAX(CASE WHEN ss.semester_number = 3 THEN ss.gpa END) as semester3,
             MAX(CASE WHEN ss.semester_number = 4 THEN ss.gpa END) as semester4,
             MAX(CASE WHEN ss.semester_number = 5 THEN ss.gpa END) as semester5,
             MAX(CASE WHEN ss.semester_number = 6 THEN ss.gpa END) as semester6,
             MAX(CASE WHEN ss.semester_number = 7 THEN ss.gpa END) as semester7,
             ROUND(AVG(ss.gpa), 2) as cgpa
      FROM students s
      JOIN semester_summary ss ON s.student_id = ss.student_id
      JOIN programs p ON s.program_id = p.program_id
      JOIN batches b ON s.batch_id = b.batch_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (program && program !== 'All') {
      query += ` AND p.program_name = ?`;
      params.push(program);
    }

    if (batch && batch !== 'All') {
      query += ` AND b.batch_name = ?`;
      params.push(batch);
    }

    query += ` GROUP BY s.student_id ORDER BY s.student_roll_no`;

    const [summary] = await pool.query(query, params);

    // Format the data (convert nulls to '—')
    const formattedData = (summary as any[]).map(row => ({
      studentName: row.studentName,
      rollNo: row.rollNo,
      semester1: row.semester1 !== null ? parseFloat(row.semester1).toFixed(2) : '—',
      semester2: row.semester2 !== null ? parseFloat(row.semester2).toFixed(2) : '—',
      semester3: row.semester3 !== null ? parseFloat(row.semester3).toFixed(2) : '—',
      semester4: row.semester4 !== null ? parseFloat(row.semester4).toFixed(2) : '—',
      semester5: row.semester5 !== null ? parseFloat(row.semester5).toFixed(2) : '—',
      semester6: row.semester6 !== null ? parseFloat(row.semester6).toFixed(2) : '—',
      semester7: row.semester7 !== null ? parseFloat(row.semester7).toFixed(2) : '—',
      cgpa: parseFloat(row.cgpa).toFixed(2)
    }));

    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error('Error fetching semester summary:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch semester summary' });
  }
};

// ============ ADD STUDENT ============
export const addStudent = async (req: Request, res: Response) => {
  try {
    const { name, rollNo, email, password, programId, batchId } = req.body;
    const pool = getPool();

    // 1. Create User
    const [userResult] = await pool.query(
      `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'student')`,
      [rollNo, email, password]
    );
    const userId = (userResult as any).insertId;

    // 2. Create Student
    await pool.query(
      `INSERT INTO students (student_name, student_roll_no, user_id, program_id, batch_id, admission_type) 
       VALUES (?, ?, ?, ?, ?, 'regular')`,
      [name, rollNo, userId, programId, batchId]
    );

    res.json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ success: false, message: 'Failed to add student' });
  }
};

// ============ UPDATE STUDENT ============
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, rollNo, programId, batchId } = req.body;
    const pool = getPool();

    // 1. Update Student profile
    await pool.query(
      `UPDATE students SET student_name = ?, student_roll_no = ?, program_id = ?, batch_id = ? 
       WHERE student_id = ?`,
      [name, rollNo, programId, batchId, id]
    );

    // 2. Update Username in users table (since rollNo is the username)
    await pool.query(
      `UPDATE users u JOIN students s ON u.user_id = s.user_id 
       SET u.username = ? WHERE s.student_id = ?`,
      [rollNo, id]
    );

    res.json({ success: true, message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, message: 'Failed to update student' });
  }
};

// ============ DELETE STUDENT ============
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Get user_id first to delete from users table too
    const [students] = await pool.query(`SELECT user_id FROM students WHERE student_id = ?`, [id]);
    const student = (students as any[])[0];

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Delete results first (foreign keys)
    await pool.query(`DELETE FROM semester_results WHERE student_id = ?`, [id]);
    await pool.query(`DELETE FROM semester_summary WHERE student_id = ?`, [id]);
    await pool.query(`DELETE FROM students WHERE student_id = ?`, [id]);
    await pool.query(`DELETE FROM users WHERE user_id = ?`, [student.user_id]);

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ success: false, message: 'Failed to delete student' });
  }
};

// ============ ADD/UPDATE RESULT ============
export const addResult = async (req: Request, res: Response) => {
  try {
    const { rollNo, subjectCode, marks, semester } = req.body;
    const pool = getPool();

    // 1. Find student and subject IDs
    const [students] = await pool.query(`SELECT student_id FROM students WHERE student_roll_no = ?`, [rollNo]);
    const [subjects] = await pool.query(`SELECT subject_id FROM subjects WHERE course_code = ?`, [subjectCode]);

    const student = (students as any[])[0];
    const subject = (subjects as any[])[0];

    if (!student || !subject) {
      return res.status(400).json({ success: false, message: 'Invalid roll number or subject code' });
    }

    // 2. Calculate grade and GP
    let grade = 'F';
    let gp = 0.0;
    const m = parseInt(marks);

    if (m >= 80) { grade = 'A'; gp = 4.0; }
    else if (m >= 70) { grade = 'B'; gp = 3.0; }
    else if (m >= 60) { grade = 'C'; gp = 2.0; }
    else if (m >= 50) { grade = 'D'; gp = 1.0; }
    else { grade = 'F'; gp = 0.0; }

    // 3. Insert or Update result
    await pool.query(
      `INSERT INTO semester_results (student_id, subject_id, semester_number, marks_obtained, grade_point_total, grade_letter)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE marks_obtained = ?, grade_point_total = ?, grade_letter = ?`,
      [student.student_id, subject.subject_id, semester, m, gp * 3, grade, m, gp * 3, grade]
    );

    // 4. Update Semester Summary (Simplified)
    const [results] = await pool.query(
      `SELECT AVG(grade_point_total / 3) as gpa, SUM(marks_obtained) as totalMarks
       FROM semester_results WHERE student_id = ? AND semester_number = ?`,
      [student.student_id, semester]
    );
    const summary = (results as any[])[0];

    await pool.query(
      `INSERT INTO semester_summary (student_id, semester_number, gpa, total_marks, result_status)
       VALUES (?, ?, ?, ?, 'published')
       ON DUPLICATE KEY UPDATE gpa = ?, total_marks = ?`,
      [student.student_id, semester, summary.gpa, summary.totalMarks, summary.gpa, summary.totalMarks]
    );

    res.json({ success: true, message: 'Result updated successfully' });
  } catch (error) {
    console.error('Error updating result:', error);
    res.status(500).json({ success: false, message: 'Failed to update result' });
  }
};

// ============ DELETE RESULT ============
export const deleteResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    await pool.query(`DELETE FROM semester_results WHERE result_entry_id = ?`, [id]);

    res.json({ success: true, message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ success: false, message: 'Failed to delete result' });
  }
};

// ============ DELETE USER ============
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPool();

    // Check if it's the current user (don't delete yourself)
    if ((req as any).user.id === parseInt(id)) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }

    await pool.query(`DELETE FROM users WHERE user_id = ?`, [id]);

    res.json({ success: true, message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};
