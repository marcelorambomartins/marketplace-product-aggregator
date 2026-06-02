import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  private readonly store = new Map<string, Product>();

  upsertMany(products: Product[]): void {
    for (const product of products) {
      this.store.set(product.id, product);
    }
  }

  findAll(): Product[] {
    return Array.from(this.store.values());
  }

  findById(id: string): Product | undefined {
    return this.store.get(id);
  }

  count(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }
}
