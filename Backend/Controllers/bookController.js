import  BookModel  from "../Models/bookModel.js";

export const addBook = async (req, res) => {
    const { title, author,genre,price,rating,imageUrl  } = req.body;
    let book;
    try{
        book = new BookModel({
            title,
            author,
            genre,
            price,
            rating,
            imageUrl
        });
        await book.save();
       
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
    }

    if (!book) {
        return res.status(500).json({ message: "Unable to add book" });
    }
    return res.status(201).json({ book });
}


export const getBooks = async (req, res, next) => {
    let books;
  try{
    books = await BookModel.find()
  }
    catch(err){
        console.log(err);
    }

    if(!books){
        return res.status(404).json({message: "No book Found"})
    }
    else{
        return res.status(200).json({books})
    }
}

export const getById = async (req, res, next) => {
    const id = req.params.id
    let book;
    try{
        book = await BookModel.findById(id);}
    catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(404).json({message: "No book Found"})
    }
    else{
        return res.status(200).json({book})
    }
}


export const updateBook = async (req, res, next) => {
    const id = req.params.id
    const { title, author,genre,price,rating,imageUrl  } = req.body;
    let book;
    try{
        book = await BookModel.findByIdAndUpdate(id, {
            title,
            author,
            genre,
            price,
            rating,
            imageUrl
        })
        book = await book.save()
    }
    catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(404).json({message: "Unable To Update By this ID"})
    }
    else{
        return res.status(200).json({book})
    }
}


export const deleteBook= async (req, res, next) => {
    const id = req.params.id
    let book;
    try{
        book = await BookModel.findByIdAndDelete(id);
    }
    catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(404).json({message: "Unable To Delete By this ID"})
    }
    else{
        return res.status(200).json({message: "Book Successfully Deleted"})
    }
}