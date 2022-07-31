import { Module } from '@nestjs/common';
import { ListMatakuliahService } from './list_matakuliah.service';
import { ListMatakuliahController } from './list_matakuliah.controller';

@Module({
  providers: [ListMatakuliahService],
  controllers: [ListMatakuliahController]
})
export class ListMatakuliahModule {}
