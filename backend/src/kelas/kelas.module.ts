import { Module } from '@nestjs/common';
import { KelasService } from './kelas.service';
import { KelasController } from './kelas.controller';

@Module({
  providers: [KelasService],
  controllers: [KelasController]
})
export class KelasModule {}
