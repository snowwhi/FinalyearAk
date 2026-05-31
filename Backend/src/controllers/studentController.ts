import type { Request, Response } from 'express';
import { getPool } from '../connections/connectToDB.js';

const gradePointMap: Record<string, number> = {
  'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0
};

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
        semestersMap.set(semNum, {
          id: `SEMESTER-${getRomanNumeral(semNum)}`,
          semester_number: semNum,
          gpa: '0.00',
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
        marks: result.marks_obtained,
        gp: gpValue,
        grade: result.grade_letter
      });
    });

    // Calculate semester GPA by back-calculating credits from GP and grade
    semestersMap.forEach((sem: any) => {
      let semGP = 0;
      let semCr = 0;

      sem.courses.forEach((c: any) => {
        const gp = parseFloat(c.gp);
        const gradeValue = gradePointMap[c.grade] || 0;
        // Back-calculate credit hours: credits = gp / grade_point_value
        const credits = gradeValue > 0 ? Math.round(gp / gradeValue) : 3;
        if (!isNaN(gp) && gp > 0) {
          semGP += gp;
          semCr += credits;
        }
        // Store calculated credits on course
        c.cr = credits > 0 ? credits : 3;
      });

      sem.gpa = semCr > 0 ? (semGP / semCr).toFixed(2) : '0.00';
      sem.totalCr = semCr;
    });

    // Calculate overall totals
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
          totalCredits += c.cr || 3;
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