import { Module } from '@nestjs/common';
import { MatkulMahasiswaService } from './matkul_mahasiswa.service';
import { MatkulMahasiswaController } from './matkul_mahasiswa.controller';

@Module({
  providers: [MatkulMahasiswaService],
  controllers: [MatkulMahasiswaController]
})
export class MatkulMahasiswaModule {}
