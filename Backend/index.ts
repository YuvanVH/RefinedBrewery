// /Fullstack/Backend/index.ts
import cors from 'cors';
import express, { Request, Response } from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';

dotenv.config();
const app = express();

// Serva frontend statiska filer
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

app.use(cors());
// Middleware för att tolka JSON-body i förfrågningar
app.use(express.json());

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER
});

client.connect();

interface Tea {
  id: number;
  name: string;
  description: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

interface RegisterBody {
  username: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

interface Comment {
  id: number;
  teaId: number;
  title: string;
  comment: string;
}

interface CommentBody {
  teaId: number;
  title: string;
  comment: string;
}

app.get("/teas", async (req: Request, res: Response) => {
  try {
    const { type } = req.query;
    let query = "SELECT * FROM teas";
    const params: string[] = [];

    if (type) {
      query += " WHERE type = $1";
      params.push(type as string);
    }

    const result = await client.query<Tea>(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching teas:", error);
    res.status(500).json({ error: "An error occurred while fetching teas" });
  }
});

// Route för att hämta ett specifikt te efter ID
app.get('/teas/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const result = await client.query<Tea>('SELECT * FROM teas WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Tea not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching tea');
  }
});

// Route för registrering av användare
app.post('/register', async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      values: [username, hashedPassword]
    };
    const { rows } = await client.query<User>(query);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route för inloggning
app.post('/login', async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { username, password } = req.body;
  try {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username]
    };
    const { rows } = await client.query<User>(query);
    if (rows.length > 0) {
      const validPassword = await bcrypt.compare(password, rows[0].password);
      if (validPassword) {
        res.status(200).json(rows[0]);
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      res.status(401).json({ message: 'Username not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error authenticating user' });
  }
});

// Route för att radera användarkonto
app.delete('/user/:id', async (req: Request<{ id: string }>, res: Response) => {
  const userId = req.params.id;
  try {
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('Server error');
  }
});

// Route för att hämta kommentarer för ett specifikt te
app.get('/comments/:teaId', async (req: Request<{ teaId: string }>, res: Response) => {
  const teaId = req.params.teaId;
  try {
    const result = await client.query<Comment>('SELECT * FROM comments WHERE teaId = $1', [teaId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).send('Server error');
  }
});

// Route för att lägga till en ny kommentar
app.post('/comments', async (req: Request<{}, {}, CommentBody>, res: Response) => {
  try {
    const { teaId, title, comment } = req.body;
    if (!teaId || !title || !comment) {
      throw new Error('Missing required fields');
    }
    const query = {
      text: 'INSERT INTO comments (teaId, title, comment) VALUES ($1, $2, $3) RETURNING *',
      values: [teaId, title, comment]
    };
    const result = await client.query<Comment>(query);
    res.status(201).json({ message: 'Comment added successfully', comment: result.rows[0] });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json(error);
  }
});

// Route för att uppdatera en befintlig kommentar
app.put('/comments/:id', async (req: Request<{ id: string }, {}, { title: string; comment: string }>, res: Response) => {
  const commentId = req.params.id;
  const { title, comment } = req.body;
  try {
    const result = await client.query<Comment>(
      'UPDATE comments SET title = $1, comment = $2 WHERE id = $3 RETURNING *',
      [title, comment, commentId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating comment:', err);
    res.status(500).send('Server error');
  }
});

// Route för att radera en kommentar
app.delete('/comments/:id', async (req: Request<{ id: string }>, res: Response) => {
  const commentId = req.params.id;
  try {
    await client.query('DELETE FROM comments WHERE id = $1', [commentId]);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).send('Server error');
  }
});

app.listen(5555, () => {
  console.log('Backend server is running on port 5555');
});
