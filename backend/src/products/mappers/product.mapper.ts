import { DummyJsonProduct } from '../dto/dummyjson-product.dto';
import { Product } from '../entities/product.entity';

const MARKETPLACE = 'dummyjson';

export function mapDummyJsonToProduct(raw: DummyJsonProduct): Product {
  return {
    id: String(raw.id),
    title: raw.title,
    description: raw.description,
    price: raw.price,
    category: raw.category,
    thumbnail: raw.thumbnail,
    rating: raw.rating,
    stock: raw.stock,
    marketplace: MARKETPLACE,
    ingestedAt: new Date().toISOString(),
  };
}
