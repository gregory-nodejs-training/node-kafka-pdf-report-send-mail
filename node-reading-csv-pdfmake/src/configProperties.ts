import { config } from 'dotenv';

config({
  path: process.env.NODE_ENV?.trim() === 'dev' ? '.env.test' : '.env'
});

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export { JWT_SECRET_KEY };
