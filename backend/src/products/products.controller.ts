import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ListProductsQueryDto } from './dto/list-products-query.dto';
import { PaginatedProductsResponseDto } from './dto/paginated-products-response.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { SyncResponseDto } from './dto/sync-response.dto';
import { ProductsIngestionService } from './services/products-ingestion.service';
import { ProductsService } from './services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ingestionService: ProductsIngestionService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista produtos com paginação e filtros' })
  @ApiOkResponse({ type: PaginatedProductsResponseDto })
  findAll(
    @Query() query: ListProductsQueryDto,
  ): PaginatedProductsResponseDto {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna o detalhe de um produto' })
  @ApiParam({ name: 'id', example: '1' })
  @ApiOkResponse({ type: ProductResponseDto })
  findOne(@Param('id') id: string): ProductResponseDto {
    return this.productsService.findOne(id);
  }

  @Post('sync')
  @ApiOperation({
    summary: 'Reingere produtos da fonte externa (DummyJSON)',
  })
  @ApiOkResponse({ type: SyncResponseDto })
  async sync(): Promise<SyncResponseDto> {
    const ingested = await this.ingestionService.ingest();

    return {
      success: true,
      ingested,
      syncedAt: new Date().toISOString(),
    };
  }
}
