import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { TenantDatasourceMiddleware } from './middlewares/tenant-datasource.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,      
    }),
    PrismaModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes("*");
    consumer.apply(TenantDatasourceMiddleware).forRoutes("*");
  }
}
