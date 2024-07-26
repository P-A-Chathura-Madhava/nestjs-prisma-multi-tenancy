import { BadRequestException, Global, Module, NotFoundException, Scope } from "@nestjs/common";
import { PublicPrismaService } from "./public-prisma.service";
import { TENANT_PRISMA_SERVICE, TenantPrismaService } from "./tenant-prisma.service";
import { REQUEST } from "@nestjs/core";
import { IRequestWithProps } from "src/types/IRequestWithProps";

@Global()
@Module({
    exports: [PublicPrismaService, TENANT_PRISMA_SERVICE],
    providers: [
        PublicPrismaService,
        {
            provide: TENANT_PRISMA_SERVICE,
            scope: Scope.REQUEST,
            inject: [REQUEST],
            useFactory: (request: IRequestWithProps) => {
                const {tenant} = request;

                if (!tenant) {
                    throw new BadRequestException();
                }

                const {tenantCode, datasourceUrl} = tenant;

                if (datasourceUrl) {
                    throw new NotFoundException();
                }

                return new TenantPrismaService(datasourceUrl).withQueryExtensions(tenantCode);
            }
        }
    ]
})

export class PrismaModule {}