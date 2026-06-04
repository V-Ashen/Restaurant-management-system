// If we are in production, it will use the live Vercel URL.
// If we are on our local computer, it will fallback to localhost:3001 automatically!
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";