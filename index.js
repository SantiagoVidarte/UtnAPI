import express from 'express'
import {router as  moviesRouter} from './routes/movies.js';
import {router as  usersRouter} from './routes/users.js';
import 'dotenv/config'
import "./config/db.js"
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const PORT = process.env.PORT ?? 3000; //busca un puerto y si no lo encuenta asigna uno
app.listen(PORT, (err) => {
    console.log(err ?
         `error lauching: ${err.message}` 
         : `lets start on http://127.0.0.1:${PORT}`);
});

app.use("/api/movies", moviesRouter);
app.use("/api/auth", usersRouter);

