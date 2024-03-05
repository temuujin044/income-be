import { Pool } from "pg";
import { nanoid } from "nanoid";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  ssl: true,
});

export default async function handler(req, res) {
  const newuser = req.body;
  console.log(newuser);
  const Query = `INSERT INTO users (id, email, name, password,currency_type
    ) VALUES ('${15}', '${newuser.email}', '${newuser.name}', '${
    newuser.password
  }', 'USD')`;
  const client = await pool.connect();
  try {
    client.query(Query);
    // console.log(response.rows[0]);
    res.status(200).send({ message: "success" });
  } finally {
    client.release();
  }
}
