import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  DummyJsonProduct,
  DummyJsonProductsResponse,
} from '../dto/dummyjson-product.dto';

@Injectable()
export class DummyJsonClient {
  private readonly logger = new Logger(DummyJsonClient.name);

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async fetchAllProducts(): Promise<DummyJsonProduct[]> {
    const baseUrl = this.config.get<string>('externalApi.url');
    const timeout = this.config.get<number>('externalApi.timeout');
    const pageSize = 100;

    const all: DummyJsonProduct[] = [];
    let skip = 0;
    let total = Number.POSITIVE_INFINITY;

    while (skip < total) {
      const response = await firstValueFrom(
        this.http
          .get<DummyJsonProductsResponse>(`${baseUrl}/products`, {
            params: { limit: pageSize, skip },
            timeout,
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(
                `DummyJSON request failed: ${error.message}`,
                error.stack,
              );
              throw new ServiceUnavailableException(
                'Não foi possível obter produtos da fonte externa (DummyJSON). Tente novamente mais tarde.',
              );
            }),
          ),
      );

      const { products, total: reportedTotal } = response.data;

      if (!Array.isArray(products)) {
        throw new ServiceUnavailableException(
          'Resposta inesperada da fonte externa (DummyJSON).',
        );
      }

      all.push(...products);
      total = reportedTotal;
      skip += pageSize;

      if (products.length === 0) {
        break;
      }
    }

    return all;
  }
}
