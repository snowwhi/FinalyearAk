import type { Request, Response, NextFunction } from 'express';
import { getPool } from '../connections/connectToDB.js';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [userId] = decoded.split(':');

    if (!userId) {
      throw new Error('Invalid token');
    }

    const pool = getPool();
    const [users] = await pool.query(
      `SELECT u.user_id, u.username, u.role, s.student_id, s.student_name, s.student_roll_no
       FROM users u
       LEFT JOIN students s ON u.user_id = s.user_id
       WHERE u.user_id = ?`,
      [userId]
    );

    const user = (users as any[])[0];
    if (!user) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    // Attach user info. For students, use student_id. For admins, use user_id.
    (req as any).user = {
      id: user.role === 'student' ? user.student_id : user.user_id,
      username: user.username,
      name: user.student_name || 'Admin',
      role: user.role,
      rollNo: user.student_roll_no
    };

    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};