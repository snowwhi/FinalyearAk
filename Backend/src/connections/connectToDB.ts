import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'fyp_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    console.log("✅ Database connected successfully!");
    return pool;

  } catch (error) {
    console.error("❌ Database connection failed!");
    if (error instanceof Error) {
      console.error(`Reason: ${error.message}`);
    }
    process.exit(1);
  }
};

export const getPool = () => {
  if (!pool) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return pool;
};