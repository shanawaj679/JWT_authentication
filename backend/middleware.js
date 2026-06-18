import jwt from "jsonwebtoken"

function verifyUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Please login first");
        }

        const decoded = jwt.verify(token, "mysecretkey");

        req.user = decoded;

        next();
    }
    catch (err) {
        return res.status(403).send("Invalid token");
    }
}
export default verifyUser;