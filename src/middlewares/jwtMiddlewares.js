import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export function checkJWT(req,res,next)
{

    const token = req.session.jwt;
    console.log(token)

    if (!token) {
        return res.status(401).json({ error: 'No token provided, go to the endpoint /login' });
      }

      try {
        const verifToken = jwt.verify(token, process.env.APP_SECRET);
        console.log(verifToken, 'is valid!');
        next();
      } catch (err) {
        console.log('Error verifying token:', err.message);
        return res.status(401).json({ error: 'Invalid token' });
      }
}