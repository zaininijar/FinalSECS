import { Module } from '@nestjs/common';
import { JadwalService } from './jadwal.service';
import { JadwalController } from './jadwal.controller';

@Module({
  providers: [JadwalService],
  controllers: [JadwalController]
})
export class JadwalModule {}
