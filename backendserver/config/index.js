import dotenv from 'dotenv';

dotenv.config();

// all env varaible must define in here to access any where
export const {
    APP_PORT,
    DEBUG_MODE,
    MONGO_CONNECT_URL,
    JWT_SECRET
} = process.env