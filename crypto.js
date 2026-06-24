import { createHash, randomBytes } from "crypto";
import { promisify } from "util";

const randomBytesAsync = promisify(randomBytes);

const buffer = await randomBytesAsync(32);
const sid_hash = createHash("sha256").update("123").digest("base64url");

const base64url = buffer.toString("base64url");
