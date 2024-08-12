import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

userSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.password;
        return ret; // Es buena práctica devolver el objeto modificado
    },
});

const User = mongoose.model("User", userSchema);
export default User;
