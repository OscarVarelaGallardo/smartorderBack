import Jwt from "jsonwebtoken";
import 'dotenv/config';

const generateToken = (payload) => {
    const token = Jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    })
    return token
}

export { generateToken }