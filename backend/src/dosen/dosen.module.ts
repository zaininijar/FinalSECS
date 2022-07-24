import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { DosenController } from './dosen.controller';
import { DosenService } from './dosen.service';

@Module({
  controllers: [DosenController],
  providers: [DosenService, JwtStrategy]
})
export class DosenModule {}
