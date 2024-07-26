import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class TenantPrismaService extends PrismaClient implements OnModuleInit {
    constructor(datasourceUrl: string) {
        super({
            datasourceUrl
        })
    }

    async onModuleInit() {
        this.$on("query" as never, async (app: INestApplication) => {
            await app.close();
        });
    
        await this.$connect();
      }

      withQueryExtensions(tenantCode: string) {
        return this.$extends({
            query: {
                $allOperations({query}) {
                    return query({where: {tenantId: tenantCode}})
                }
            }
        })
      }
}

export const TENANT_PRISMA_SERVICE = TenantPrismaService.name;