import { Query } from "../../core/utils/abstract.ts";

type userRole = "admin" | "editor" | "user";

type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: userRole;
  password_hash: string;
  created: string;
  updated: string;
};

type userCreate = Omit<UserData, "id" | "created" | "updated">;

type SessionData = {
  sid_hash: Buffer;
  created: number;
  user_id: number;
  expires: number;
  ip: string;
  ua: string;
  revoked: number;
};

type SessionCreate = Omit<SessionData, "created" | "revoked" | "expires"> & {
  expires_ms: number;
};

export class AuthQuery extends Query {
  insertUser({ name, username, email, role, password_hash }: userCreate) {
    return this.db
      .query(
        /*sql*/ `
        INSERT OR IGNORE INTO "users"("name", "username", "email", "role", "password_hash") VALUES(?, ?, ?, ?, ?)
      `,
      )
      .run(name, username, email, role, password_hash);
  }

  insertSession({ sid_hash, user_id, expires_ms, ip, ua }: SessionCreate) {
    return this.db
      .query(
        /*sql*/ `
        INSERT OR IGNORE INTO "sessions"("sid_hash", "user_id", "expires", "ip", "ua") VALUES(?, ?, ?, ?, ?)
      `,
      )
      .run(sid_hash, user_id, Math.floor(expires_ms / 1000), ip, ua);
  }

  selectSession(sid_hash: Buffer) {
    return this.db
      .query(
        /*sql*/ `
        SELECT "s".*, "s"."expires" * 1000 as "expires_ms" FROM  "sessions" as "s" WHERE "sid_hash" = ?
      `,
      )
      .get(sid_hash) as (SessionData & { expires_ms: number }) | undefined;
  }

  revokeSession(key: "sid_hash" | "user_id", sid_hash: Buffer) {
    return this.db
      .query(
        /*sql*/ `
        UPDATE "sessions" SET "revoked" = 1 WHERE ${key}= ? 
      `,
      )
      .run(sid_hash);
  }

  updateSessionExpires(sid_hash: Buffer, expires_ms: number) {
    return this.db
      .query(
        /*sql*/ `
        UPDATE "sessions" SET "expires" = ? WHERE "sid_hash"= ? 
      `,
      )
      .run(Math.floor(expires_ms / 1000), sid_hash);
  }

  selectUserRole(id: number) {
    return this.db
      .query(
        /*sql*/ `
        SELECT "role" FROM "users" where "id" = ? 
      `,
      )
      .get(id) as { role: userRole } | undefined;
  }
}
