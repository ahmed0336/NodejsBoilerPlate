import dotenv from 'dotenv';

dotenv.config();

// all env varaible must define in here to access any where
export const {
    APP_PORT,
    DEBUG_MODE
} = process.env