import { Router } from 'express'
import {movieController} from '../controller/movies.js';
import { token } from '../services/jwt.js';
export const router = Router();
router.get("/",movieController.getAllMovies);
router.get("/s",movieController.getByTitle );
router.get("/:id", (req, res) => res.send(`List a movie by id:${req.params.id}`));
router.delete("/:id", token.validate, movieController.deleteOne);
router.patch("/:id",token.validate,movieController.updateOne);
router.post("/",token.validate, movieController.createOne);