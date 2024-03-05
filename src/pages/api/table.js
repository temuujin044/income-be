import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: true,
});

export default async function handler(req, res) {
  const client = await pool.connect();

  try {
    const response = await client.query(
      "CREATE TABLE users (ID VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(50) NOT NULL, password TEXt, avatar_img varchar(255), createdAt TIMESTAMP, updatedAt TIMESTAMP , currency_type TEXT DEFAULT 'MNT');"
    );

    console.log(response.rows[0]);

    res.status(200).json({
      data: response.rows[0],
    });
  } finally {
    client.release();
  }
}
