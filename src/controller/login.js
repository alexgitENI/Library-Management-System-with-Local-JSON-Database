import jwt from 'jsonwebtoken';
import { readData } from "../middlewares/utils/readAndWriteData.js";
import { comparePasswords } from '../middlewares/utils/password.js';

const INVALID_CREDENTIALS_ERROR = 'Invalid credentials';
const INTERNAL_SERVER_ERROR = 'Internal Server Error';

export async function connexion(req, res) {
  try {
    const { email, password } = req.body;

    const users = await readData('user.json');
    const user = users.find((user) => user.email === email);

    if (!user || !comparePasswords(password, user.password)) {
        return res.status(401).json({ error: INVALID_CREDENTIALS_ERROR });
      }

    const token = jwt.sign(
      { user: user.id, role: user.role },
      process.env.APP_SECRET,
      { expiresIn: '36000' }
    );
    req.session.jwt = token;

    res.json({ message: 'Authentication successful' });
  } catch (error) {
    res.status(500).json({ error: INTERNAL_SERVER_ERROR });
  }
}

