import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION, { autoCreate: true }),
    ProductsModule,
    ProvidersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
