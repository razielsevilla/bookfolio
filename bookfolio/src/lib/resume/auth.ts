// Shared secret gating résumé generation — set RESUME_ACCESS_PASSWORD in
// .env.local for dev and in your deployment platform's env vars for
// production. Fails closed: an unset secret never matches any password,
// including an empty one.
export function isValidResumePassword(password: unknown): boolean {
  const secret = process.env.RESUME_ACCESS_PASSWORD;
  if (!secret) return false;
  return typeof password === 'string' && password === secret;
}
