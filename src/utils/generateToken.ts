import jwt from 'jwt-simple';

/* ---------------------------- Import interfaces --------------------------- */
import { UserPayload } from './Interfaces/UserPayload';

const secretKey = 'LOCALSTORAGE_TOKEN';  // Normalmente esto debería estar en el backend

export const generateToken = (user: UserPayload): string => {
    const payload = {
        ...user,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)  // 1 hora de expiración
    };
    return jwt.encode(payload, secretKey, 'HS256');
    // return jwt.sign(user, secretKey, { expiresIn: '1h' });
}