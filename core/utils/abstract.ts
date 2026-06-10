import type { Core } from "../core.ts";
import type { Database } from "../database.ts";
import type { Handler, Router } from "../router.ts";

export abstract class CoreProvider {
  core: Core;
  router: Router;
  db: Database;
  constructor(core: Core) {
    this.core = core;
    this.router = core.router;
    this.db = core.db;
  }
}

export abstract class Api extends CoreProvider {
  handlers: Record<string, Handler> = {};
  /** Utilize para criar as tabelas */
  tables() {}
  /** registr as rotas da api aqui*/
  routes() {}

  init() {
    this.tables();
    this.routes();
  }
}

export abstract class Query {
  db: Database;
  constructor(db: Database) {
    this.db = db;
  }
}
