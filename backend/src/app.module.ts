import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DosenModule } from './dosen/dosen.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { JurusanModule } from './jurusan/jurusan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule,  
    PrismaModule, DosenModule, MahasiswaModule, JurusanModule,
  ],
})
export class AppModule {}
