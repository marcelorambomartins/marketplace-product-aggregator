import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repositories/product.repository';
import { DummyJsonClient } from './services/dummyjson.client';
import { ProductsIngestionService } from './services/products-ingestion.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        timeout: config.get<number>('externalApi.timeout'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductsController],
  providers: [
    ProductRepository,
    DummyJsonClient,
    ProductsService,
    ProductsIngestionService,
  ],
  exports: [ProductsService, ProductRepository],
})
export class ProductsModule {}
