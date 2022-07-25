import { Module } from '@nestjs/common';
import { MatkulService } from './matkul.service';
import { MatkulController } from './matkul.controller';

@Module({
  providers: [MatkulService],
  controllers: [MatkulController]
})
export class MatkulModule {}
