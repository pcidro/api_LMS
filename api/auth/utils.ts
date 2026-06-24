import { createHash, randomBytes } from "crypto";
import { promisify } from "util";

export const randomBytesAsync = promisify(randomBytes);

export function sha256(message: string) {
  return createHash("sha256").update(message).digest();
}
