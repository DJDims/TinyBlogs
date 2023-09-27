import jsonwebtoken from "jsonwebtoken";
import User from "../Schemes/User.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        const user = await User.getUserByToken(token);
        user.updateLastLogin();
        req.user = user;
        next();
    });
}