import type { Request, Response } from 'express';
import { getPool } from '../connections/connectToDB.js';
import { verifyPassword, hashPassword } from '../utils/hashPassword.js';

// ============ STUDENT LOGIN ============
export const studentLogin = async (req: Request, res: Response) => {
  try {
    const { rollNo, password } = req.body;

    if (!rollNo || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Roll number and password are required' 
      });
    }

    const pool = getPool();

    const [users] = await pool.query(
      `SELECT u.user_id, u.username, u.email, u.password, u.role,
              s.student_id, s.student_roll_no, s.student_name, s.batch_id, s.program_id
       FROM users u
       JOIN students s ON u.user_id = s.user_id
       WHERE u.username = ? AND u.role = 'student'`,
      [rollNo]
    );

    const user = (users as any[])[0];

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid roll number or password' 
      });
    }

    const isValid = verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid roll number or password' 
      });
    }

    const token = Buffer.from(`${user.user_id}:${Date.now()}`).toString('base64');

    delete user.password;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.student_id,
          rollNo: user.student_roll_no,
          name: user.student_name,
          email: user.email,
          role: user.role,
          batchId: user.batch_id,
          programId: user.program_id
        },
        token
      }
    });

  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// ============ ADMIN LOGIN ============
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }

    const pool = getPool();

    const [users] = await pool.query(
      `SELECT user_id, username, email, password, role
       FROM users
       WHERE username = ? AND role = 'super_admin'`,
      [username]
    );

    const user = (users as any[])[0];

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials' 
      });
    }

    const isValid = verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials' 
      });
    }

    const token = Buffer.from(`${user.user_id}:${Date.now()}`).toString('base64');

    delete user.password;

    res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
          name: 'Administrator'
        },
        token
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

// ============ UPDATE ALL STUDENT PASSWORDS ============
export const updateDummyPasswords = async (req: Request, res: Response) => {
  try {
    const { newPassword = '12345678' } = req.body;
    const hashedPassword = hashPassword(newPassword);
    const pool = getPool();

    const [result] = await pool.query(
      `UPDATE users 
       SET password = ? 
       WHERE role = 'student'`,
      [hashedPassword]
    );

    res.json({
      success: true,
      message: `All student passwords updated to: ${newPassword}`,
      affectedRows: (result as any).affectedRows
    });

  } catch (error) {
    console.error('Update passwords error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update passwords' 
    });
  }
};