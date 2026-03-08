import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import bookRouter from './Routes/bookRoute.js';
import cors from 'cors'
const app= express();
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use("/api", bookRouter);

const Port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(Port,()=>{
    console.log(`Server Is Running on Port ${Port}`);
    
})
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err)
})
app.get('/',(req,res)=>{
    res.send(`Server is running on http://localhost:${Port}`);
});
