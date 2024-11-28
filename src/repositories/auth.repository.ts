import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PostgresService } from "src/provider/postgres/postgres-client";
import { CreateAuthDto } from "src/services/auth/dto/create-auth.dto";
import { UpdateAuthDto } from "src/services/auth/dto/update-auth.dto";

@Injectable()
export class AuthRepository {
    constructor(private readonly postgresService: PostgresService) { }

    async authUser(dto: CreateAuthDto): Promise<Users> {
        const query = await this.postgresService.query(
            'SELECT id,name,email,password,role FROM users WHERE email = $1',
            [dto.email]
        )
        return query.rows[0]
    }

    async findUnique(dto: UpdateAuthDto): Promise<Users> {
        const query = await this.postgresService.query(
            'SELECT id,name,email,role FROM users WHERE id = $1',
            [dto.id]
        )
        return query.rows[0]
    }
}