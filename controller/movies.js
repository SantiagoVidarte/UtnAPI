import { Movie } from '../model/mongoDB/mongo.js';
export const movieController = {
    async getAllMovies(req, res) {
        const movieCollection = await Movie.find()
        movieCollection
            ? res.status(200)
                .json({ success: true, data: movieCollection, message: "lista de peliculas" })
            : res.status(404)
                .json({ success: false, message: "no hay peliculas" });
    },
    //____________________________________________________

    async getByTitle(req, res) {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Por favor, proporciona un título para buscar.",
            });
        }
        try {
            const movies = await Movie.find({ title: { $regex: title, $options: "i" } });
            if (!movies.length) {
                return res.status(404).json({
                    success: false,
                    message: `No se encontraron películas con el título ${title}`,
                });
            }
            res.status(200).json({
                success: true,
                data: movies,
                message: "Lista de películas encontrada.",
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: `Error al buscar películas: ${err.message}`,
            });
        }
    },

    //_____________________________________________________

    async createOne(req, res) {
        const { title, release_year, director, rating, image_url } = req.body;
        const newMovie = new Movie({ title, release_year, director, rating, image_url });
        try {
            await newMovie.save()
            res.status(200)
                .json({ success: true, message: "pelicula creada" });
        } catch (err) {
            res
                .status(400)
                .json({ success: false, message: err.message });
        }
    },
    //_____________________________________________________

    async deleteOne(req, res) {
        try {
          const movie = await Movie.findByIdAndDelete(req.params.id)
          if(!movie){
            return res.status(404).json({
                success: false,
                message: "movie not found",
            });
          }
          res
                .status(204)
                .json({ success: true, message: "pelicula eliminada" });
        } catch (err) {
            res
                .status(400)
                .json({ success: false, message: err.message });
        }
    },
    //_____________________________________________________

    async updateOne(req, res) {
        const allowedFields = ["title", "release_year", "director", "rating", "image_url"];    
        try {
            const updates = Object.keys(req.body);
            const isValidate = updates.every((update) => allowedFields.includes(update));
            if (!isValidate) {
                return res.status(400).json({
                    success: false,
                    message: "not allowedUpdates",
                });
            }
            const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });            
            if (!movie) {
                return res.status(404).json({
                    success: false,
                    message: "movie not found",
                });
            }
            // Responde con la película actualizada
            res.status(200).json({
                success: true,
                message: "pelicula modificada",
                data: movie,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }
    
}

