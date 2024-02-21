import { Request } from 'express';
import { parse } from 'cookie-parse';

function extractJwtFromCookie(req: Request) {
  const cookieInfo = parse(req.headers.cookie, '/') as any;
  return cookieInfo.token;
}
export default extractJwtFromCookie;
