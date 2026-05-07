if (!process.env.DB_URL) {
  throw new Error('Missing DB_URL environment variable');
}

export const dbUrl = process.env.DB_URL;
export const provide = 'DbProvider';
