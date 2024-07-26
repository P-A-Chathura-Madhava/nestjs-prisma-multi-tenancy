import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PublicPrismaService extends PrismaClient implements OnModuleInit {
    [x: string]: any;
    constructor() {
        super();
    }

    async onModuleInit() {
        this.$on('query' as never, async (app: INestApplication) => {
            await app.close();
        })

        await this.$connect();
    }
}