import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    },
    author: {
        type: String,
        required: true,
      },
    genre :{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    imageUrl:{
        type:String,
        required:true
    }
},
{
    timestamps: true,
}
);
const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;