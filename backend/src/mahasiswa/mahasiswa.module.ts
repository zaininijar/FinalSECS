import { Module } from '@nestjs/common';
import { MahasiswaController } from './mahasiswa.controller';
import { MahasiswaService } from './mahasiswa.service';

@Module({
  controllers: [MahasiswaController],
  providers: [MahasiswaService]
})
export class MahasiswaModule {}
