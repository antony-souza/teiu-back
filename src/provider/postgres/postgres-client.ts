import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { environment } from "environment/environment";
import { Pool } from "pg";

@Injectable()
export class PostgresService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: environment.databaseUrl
    });
  }

  async onModuleInit() {
    await this.pool.connect();
    
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  query(query: string, params: any[]) {
    return this.pool.query(query, params);
  }
}
