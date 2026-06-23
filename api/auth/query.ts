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

type SessionCreate = {
  sid_hash: number;
  user_id: number;
  expires_ms: number;
  ip: string;
  ua: string;
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
}
