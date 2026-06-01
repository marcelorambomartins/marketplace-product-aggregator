import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty({ example: 'ok', description: 'Status da aplicação' })
  status: string;

  @ApiProperty({ example: '2026-05-31T18:00:00.000Z', description: 'Data/hora da verificação (ISO 8601)' })
  timestamp: string;

  @ApiProperty({ example: 123.45, description: 'Tempo de execução do processo em segundos' })
  uptime: number;

  @ApiProperty({ example: 'production', description: 'Ambiente de execução (NODE_ENV)' })
  environment: string;
}
