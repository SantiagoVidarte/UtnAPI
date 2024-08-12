import { Router } from 'express'
import {movieController} from '../controller/movies.js';
import { token } from '../services/jwt.js';
export const router = Router();
router.get("/", token.validate,movieController.getAllMovies);
router.get("/s",movieController.getByTitle );
router.get("/:id", (req, res) => res.send(`List a movie by id:${req.params.id}`));
router.delete("/:id", movieController.deleteOne);
router.patch("/:id",movieController.updateOne);
router.post("/", movieController.createOne);