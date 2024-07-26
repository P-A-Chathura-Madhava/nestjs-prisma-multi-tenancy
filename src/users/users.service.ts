import { Inject, Injectable } from '@nestjs/common';
import { TENANT_PRISMA_SERVICE, TenantPrismaService } from 'src/prisma/tenant-prisma.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject(TENANT_PRISMA_SERVICE) private readonly prisma: TenantPrismaService
    ) {}

    async findAll() {
        console.log("All Users");
        return await this.prisma.user.findMany();        
    }
}
