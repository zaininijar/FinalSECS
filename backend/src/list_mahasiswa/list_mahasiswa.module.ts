import { Module } from '@nestjs/common';
import { ListMahasiswaService } from './list_mahasiswa.service';
import { ListMahasiswaController } from './list_mahasiswa.controller';

@Module({
  providers: [ListMahasiswaService],
  controllers: [ListMahasiswaController]
})
export class ListMahasiswaModule {}
