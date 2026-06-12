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
}
