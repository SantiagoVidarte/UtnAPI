import User from "../model/mongoDB/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const saltRounds = 10;

const userController = {
    async registerUser(req, res) {
        const { fullName, email } = req.body;
        const password = await bcrypt.hash(req.body.password, saltRounds);
        const data = { fullName, email, password };
        const newUser = new User(data);
        try {
            const savedUser = await newUser.save();
            res.status(201).json({ success: true, message: "User registered", data: savedUser });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal error" });
        }
    },
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ success: false, message: "User not found" });
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ success: false, message: "Incorrect Email or Password" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ success: false, message: "Incorrect password" });
            }
            const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, message: "Login successful", data: { accessToken } });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal error" });
        }
    }
};

export default userController;
