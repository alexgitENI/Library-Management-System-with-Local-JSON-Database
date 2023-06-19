import bookSchema from '../type/bookType.js'; 
import { readData, writeData } from "../middlewares/utils/readAndWriteData.js";

export async function getBooks(req, res) {
    try {
      const library = await readData('library.json');
      res.json(library);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  



export async function getBooksId (req, res) {
    console.log(req.user)
    const bookId = req.params.id;
    
    try {
        const data = await readData('library.json');
      const books = JSON.parse(data).books;
      
      const book = books.find(book => book.id === parseInt(bookId));
      
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  export async function createBook(req, res) {
    const body = req.body;
  
    // Validation des valeurs du corps
    const { error, value } = bookSchema.validate(body);
  
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
  
    try {
     const library = await readData('library.json');

  
      const lastBook = library.books[library.books.length - 1];
      const lastId = lastBook ? lastBook.id : 0;
      const newId = lastId + 1;
  
      // Ajouter le nouvel livre aux données existantes
      const newBook = {
        id: newId,
        title: value.title,
        author: value.author,
        ISBN: value.ISBN,
        genre:value.genre
      };
  
      library.books.push(newBook);
  
      await writeData('library.json', library);
  
      res.status(200).send('Book added!');
    } catch (err) {
      res.status(500).json({ error: 'Failed to add book to library' });
    }
  }
  

  export async function updateBook (req, res) {
    const bookId = req.params.id;
    const updatedBookData = req.body;
    try {
      // Validation des valeurs mises à jour du livre
      
      const { error, value } =  bookSchema.validate(updatedBookData);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const library = await readData('library.json');
      // Rechercher le livre à mettre à jour dans la liste des livres
      const bookIndex = library.books.findIndex((book) => book.id == bookId);
  
      if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
      }
  

      library.books[bookIndex] = {...library.books[bookIndex],
        title: value.title,
        author: value.author,
        ISBN: value.ISBN,
        genre:value.genre
      };
  

      await writeData('library.json', library);
  
      res.send('<h1>Book updated successfully</h1>');
    } catch (error) {
      res.status(500).json({ error: 'Failed to update book' });
    }
  };

  export async function deleteBook (req, res)  {
    const bookId = req.params.id;
  
    try {
      // Lire le fichier library.json
      const library = await readData('library.json');
  
      // Rechercher le livre à supprimer dans la liste des livres
      const bookIndex = library.books.findIndex((book) => book.id == bookId);
  
      if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      library.books.splice(bookIndex, 1);
  
      await writeData('library.json', library);
  
      res.send('<h1>Book deleted successfully</h1>');
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete book' });
    }
  };