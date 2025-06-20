import express from 'express';
import noteRoutesr from './routes/noteRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import ratelimiter from './middleware/rateLimmiter.js';
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();
connectDB();

const __dirname = path.resolve();

if (process.env.NODE_ENV !== 'production'){
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
const port = process.env.PORT || 5001;
app.use(ratelimiter);





app.use('/api/post', noteRoutesr);
app.use(express.static(path.join(__dirname, '../frontend/dist')));

if (process.env.NODE_ENV === 'production') {
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(port, () => {
    console.log('Server is running on port 5001');
});


// mongodb+srv://21ug1036:iTUsMvdE4cP6QXZm@cluster0.prsusdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// iTUsMvdE4cP6QXZm