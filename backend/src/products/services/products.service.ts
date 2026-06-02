import { Injectable, NotFoundException } from '@nestjs/common';
import { ListProductsQueryDto } from '../dto/list-products-query.dto';
import { PaginatedProductsResponseDto } from '../dto/paginated-products-response.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductRepository) {}

  findAll(query: ListProductsQueryDto): PaginatedProductsResponseDto {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    const filtered = this.applyFilters(this.repository.findAll(), query);
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total, page, limit };
  }

  findOne(id: string): Product {
    const product = this.repository.findById(id);

    if (!product) {
      throw new NotFoundException(`Produto com id "${id}" não encontrado`);
    }

    return product;
  }

  private applyFilters(
    products: Product[],
    query: ListProductsQueryDto,
  ): Product[] {
    return products.filter((product) => {
      if (
        query.category &&
        product.category.toLowerCase() !== query.category.toLowerCase()
      ) {
        return false;
      }

      if (query.minPrice !== undefined && product.price < query.minPrice) {
        return false;
      }

      if (query.maxPrice !== undefined && product.price > query.maxPrice) {
        return false;
      }

      if (query.search) {
        const term = query.search.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(term);
        const matchesDescription = product.description
          .toLowerCase()
          .includes(term);

        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }
}
