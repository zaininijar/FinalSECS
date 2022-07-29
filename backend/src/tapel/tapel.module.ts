import { Module } from '@nestjs/common';
import { TapelService } from './tapel.service';
import { TapelController } from './tapel.controller';

@Module({
  providers: [TapelService],
  controllers: [TapelController]
})
export class TapelModule {}
