import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'iPhone 9' })
  title: string;

  @ApiProperty({ example: 'An apple mobile which is nothing like apple' })
  description: string;

  @ApiProperty({ example: 549 })
  price: number;

  @ApiProperty({ example: 'smartphones' })
  category: string;

  @ApiProperty({ example: 'https://cdn.dummyjson.com/product-images/1/thumbnail.webp' })
  thumbnail: string;

  @ApiProperty({ example: 4.69 })
  rating: number;

  @ApiProperty({ example: 94 })
  stock: number;

  @ApiProperty({ example: 'dummyjson' })
  marketplace: string;

  @ApiProperty({ example: '2026-05-31T18:00:00.000Z' })
  ingestedAt: string;
}
