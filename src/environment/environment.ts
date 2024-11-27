import * as dotenv from "dotenv";

dotenv.config();

class Environment {
    public readonly port: number = parseInt(process.env.PORT ?? "");
    public readonly redisCacheHost: string = process.env.REDIS_CACHE_HOST ?? "";
    public readonly redisCachePort: number = parseInt(process.env.REDIS_CACHE_PORT ?? "");
    public readonly redisCachePassword: string = process.env.REDIS_CACHE_PASSWORD ?? "";
}

export const environment = new Environment();