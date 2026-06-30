export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  internalApiUrl:
    process.env.NEXT_PUBLIC_INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
} as const;

for (const [key, value] of Object.entries(env)) {
  if (!value) {
    throw new Error(`🚨 Environment variable missing for: ${key}`);
  }
}
