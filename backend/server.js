import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ConnectDB } from './lib/db.js';
dotenv.config();

const app = express();


app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/message",messageRoutes);
app.use("/api/v1/users",userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    ConnectDB();
});