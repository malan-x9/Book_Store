import express from 'express';
import { addBook, deleteBook, getBooks, getById, updateBook } from '../Controllers/bookController.js';
const bookRouter = express.Router();

bookRouter.post("/addbook",addBook)
bookRouter.get("/getBooks",getBooks)
bookRouter.get("/:id",getById)
bookRouter.put("/update/:id",updateBook)
bookRouter.delete("/delete/:id",deleteBook)

export default bookRouter;
