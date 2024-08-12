import mongoose from "mongoose";

// Definir el esquema de la película
const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "El título es obligatorio"],
        },
        release_year: {
            type: Number,
        },
        director: {
            type: String,
            default: "Desconocido",
        },
        rating: {
            type: String,
            enum: ["G", "PG", "PG-13", "R", "NC-17"], // Clasificación de películas estándar
            default: "G",
        },
        image_url: {
            type: String,

        },
    },
);
movieSchema.index({ title: "text" })

// Exportar el modelo de película
export const Movie = mongoose.model("Movie", movieSchema);

