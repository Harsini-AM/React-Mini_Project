import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://fragon1929:R97F6h3jR5P2s7qr@cluster0.o3kthmu.mongodb.net/miniproject').then(()=>console.log('Database connected'));
}