import { Module } from '@nestjs/common';
import { NilaiService } from './nilai.service';
import { NilaiController } from './nilai.controller';

@Module({
  providers: [NilaiService],
  controllers: [NilaiController]
})
export class NilaiModule {}
