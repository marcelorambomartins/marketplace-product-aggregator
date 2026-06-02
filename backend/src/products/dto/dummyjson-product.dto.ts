export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export interface DummyJsonProductsResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}
