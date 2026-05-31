import type { Request, Response } from 'express';
import { getPool } from '../connections/connectToDB.js';

export const getStudentTranscript = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId || (req as any).user?.id;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID required'
      });
    }

    const pool = getPool();

    // Get student basic info
    const [students] = await pool.query(
      `SELECT s.student_id, s.student_roll_no, s.student_name, 
              b.batch_name, b.start_year, b.end_year,
              p.program_name
       FROM students s
       JOIN batches b ON s.batch_id = b.batch_id
       JOIN programs p ON s.program_id = p.program_id
       WHERE s.student_id = ?`,
      [studentId]
    );

    const student = (students as any[])[0];
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Get semester summaries for GPA
    const [summaries] = await pool.query(
      `SELECT semester_number, gpa, total_marks, semester_gpts
       FROM semester_summary
       WHERE student_id = ?
       ORDER BY semester_number ASC`,
      [studentId]
    );

    // Create summary map
    const summaryMap = new Map();
    (summaries as any[]).forEach(sum => {
      summaryMap.set(sum.semester_number, {
        gpa: sum.gpa || '0.00',
        totalMarks: sum.total_marks || 0,
        semesterGpts: parseFloat(sum.semester_gpts) || 0
      });
    });

    // Get all courses for this student
    const [courses] = await pool.query(
      `SELECT sr.semester_number, sr.marks_obtained, sr.grade_point_total, sr.grade_letter,
              sub.course_code, sub.subject_name
       FROM semester_results sr
       JOIN subjects sub ON sr.subject_id = sub.subject_id
       WHERE sr.student_id = ?
       ORDER BY sr.semester_number ASC, sub.course_code ASC`,
      [studentId]
    );

    const results = courses as any[];

    // Group by semester
    const semestersMap = new Map();

    results.forEach(result => {
      const semNum = result.semester_number;

      if (!semestersMap.has(semNum)) {
        const summary = summaryMap.get(semNum) || { gpa: '0.00', totalMarks: 0, semesterGpts: 0 };
        semestersMap.set(semNum, {
          id: `SEMESTER-${getRomanNumeral(semNum)}`,
          semester_number: semNum,
          gpa: summary.gpa,
          semesterGpts: summary.semesterGpts,
          totalCr: 0,
          courses: []
        });
      }

      const semester = semestersMap.get(semNum);

      let gpValue = '0.00';
      if (result.grade_point_total !== null && result.grade_point_total !== undefined) {
        const numGp = parseFloat(result.grade_point_total);
        gpValue = isNaN(numGp) ? '0.00' : numGp.toFixed(2);
      }

      semester.courses.push({
        code: result.course_code,
        title: result.subject_name,
        cr: 3,
        marks: result.marks_obtained,
        gp: gpValue,
        grade: result.grade_letter
      });

      semester.totalCr += 3;
    });

    // Calculate semester GPA from course grade points
    semestersMap.forEach((sem: any) => {
      const semTotalGP = sem.courses.reduce((sum: number, c: any) => sum + (parseFloat(c.gp) || 0), 0);
      const semTotalCr = sem.totalCr;
      const calculatedGpa = semTotalCr > 0 ? (semTotalGP / semTotalCr).toFixed(2) : '0.00';
      sem.gpa = calculatedGpa;
    });

    // Calculate overall totals from course grade points
    let totalMarksObt = 0;
    let totalMarksMax = 0;
    let totalGradePoints = 0;
    let totalCredits = 0;

    semestersMap.forEach((sem: any) => {
      totalMarksObt += sem.courses.reduce((sum: number, c: any) => sum + (Number(c.marks) || 0), 0);
      totalMarksMax += sem.courses.length * 100;

      sem.courses.forEach((c: any) => {
        const gp = parseFloat(c.gp);
        if (!isNaN(gp) && gp > 0) {
          totalGradePoints += gp;
          totalCredits += 3;
        }
      });
    });

    const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00';
    const percentage = totalMarksMax > 0 ? ((totalMarksObt / totalMarksMax) * 100).toFixed(2) : '0';

    const response = {
      personal: {
        name: student.student_name,
        rollNo: student.student_roll_no,
        program: student.program_name === 'BSCS' ? 'BS Computer Science' : student.program_name,
        university: 'Thal University Bhakkar',
        session: `${student.start_year}-${student.end_year}`,
        docNo: `IT-F-${student.student_roll_no.slice(-6)}`
      },
      summary: {
        cgpa,
        percentage,
        marksObt: totalMarksObt,
        marksTotal: totalMarksMax
      },
      semesters: Array.from(semestersMap.values())
    };

    res.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Transcript error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transcript data',
      error: String(error)
    });
  }
};

function getRomanNumeral(num: number): string {
  const romanNumerals: Record<number, string> = {
    1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII'
  };
  return romanNumerals[num] || String(num);
}