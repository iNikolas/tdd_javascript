if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}

export const dbUrl = process.env.DATABASE_URL;
export const provide = "DbProvider";
