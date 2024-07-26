import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response } from "express";
import { PublicPrismaService } from "src/prisma/public-prisma.service";
import { IRequestWithProps } from "src/types/IRequestWithProps";

@Injectable()
export class TenantDatasourceMiddleware implements NestMiddleware {
    constructor(private readonly prisma: PublicPrismaService) {}

    async use(req: IRequestWithProps, res: Response, next: () => void) {
        const tenantCode = req.headers["x-tenant-code"] as string;

        const tenant = await this.prisma.tenant.findFirst({
            include: {datasource: true},
            where: {code: tenantCode}
        })

        req.tenant = {
            tenantCode: tenantCode,
            datasourceUrl: tenant?.datasource?.url
        };
        next();
    }
}