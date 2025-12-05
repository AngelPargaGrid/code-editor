import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  googleApiKey: process.env.GOOGLE_API_KEY,
  
  validate() {
    if (!this.googleApiKey) {
      console.error('Missing GOOGLE_API_KEY in .env');
      process.exit(1);
    }
  }
};