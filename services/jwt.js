import jwt from "jsonwebtoken"
const secret = process.env.JWT_SECRET;
export const jwt = {
    async generate(user){
        const userForToken = {
            fullName: user.fullName,
            email:user.email,
        };
        return jwt.sing(userForToken, secret,{expiresIn:"1h"});
    },
};