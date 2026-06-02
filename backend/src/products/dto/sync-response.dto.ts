import { ApiProperty } from '@nestjs/swagger';

export class SyncResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 194 })
  ingested: number;

  @ApiProperty({ example: '2026-05-31T18:00:00.000Z' })
  syncedAt: string;
}
