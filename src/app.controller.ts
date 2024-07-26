import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicPrismaService } from './prisma/public-prisma.service';
import { TENANT_PRISMA_SERVICE, TenantPrismaService } from './prisma/tenant-prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PublicPrismaService,
    @Inject(TENANT_PRISMA_SERVICE)
    private readonly tenantPrisma: TenantPrismaService
  ) {}

  @Get('/alltenants')
  async getAllTenants() {
    const tenats = await this.prisma.tenant.findMany();
    return {tenats};
  }

  @Get("/users")
  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return {users};
  }
}
