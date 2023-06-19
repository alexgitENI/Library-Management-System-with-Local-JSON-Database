import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { checkJWT } from "./src/middlewares/jwtMiddlewares.js";
import session from "express-session";
import { getBooks, getBooksId, createBook, updateBook, deleteBook } from "./src/controller/books.js";
import { connexion } from "./src/controller/login.js";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT} = process.env;


const app = express();
// ==========
// App middlewares
// ==========
app.use(session({
    name: 'simple',
    secret: 'simple',
    resave: true,
    saveUninitialized: true
  }));

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());
app.use(morgan(':method :url :status :user-agent - :response-time ms - :res[content-length]'));

// ==========
// App routers
// ==========

app.post('/login',connexion)

app.get('/books',getBooks);
app.get('/books/:id',getBooksId);
  
app.post('/books',createBook)
app.put('/books/:id',updateBook)

app.delete('/books/:id', checkJWT,deleteBook)
  
  
// ==========
// App start
// ==========

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
