import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { mapDummyJsonToProduct } from '../mappers/product.mapper';
import { ProductRepository } from '../repositories/product.repository';
import { DummyJsonClient } from './dummyjson.client';

@Injectable()
export class ProductsIngestionService implements OnModuleInit {
  private readonly logger = new Logger(ProductsIngestionService.name);

  constructor(
    private readonly dummyJsonClient: DummyJsonClient,
    private readonly repository: ProductRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const count = await this.ingest();
      this.logger.log(`Ingestão inicial concluída: ${count} produtos`);
    } catch (error) {
      this.logger.error(
        'Ingestão inicial falhou — a API segue disponível; use POST /api/products/sync',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  async ingest(): Promise<number> {
    const rawProducts = await this.dummyJsonClient.fetchAllProducts();
    const products = rawProducts.map(mapDummyJsonToProduct);

    this.repository.clear();
    this.repository.upsertMany(products);

    return products.length;
  }
}
