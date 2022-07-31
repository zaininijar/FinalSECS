import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DosenModule } from './dosen/dosen.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { JurusanModule } from './jurusan/jurusan.module';
import { KelasModule } from './kelas/kelas.module';
import { MatkulModule } from './matkul/matkul.module';
import { TapelModule } from './tapel/tapel.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { MatkulMahasiswaModule } from './matkul_mahasiswa/matkul_mahasiswa.module';
import { NilaiModule } from './nilai/nilai.module';
import { ListMahasiswaModule } from './list_mahasiswa/list_mahasiswa.module';
import { ListMatakuliahModule } from './list_matakuliah/list_matakuliah.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule, 
    UserModule,  
    PrismaModule, DosenModule, MahasiswaModule, JurusanModule, KelasModule, MatkulModule, TapelModule, JadwalModule, MatkulMahasiswaModule, NilaiModule, ListMahasiswaModule, ListMatakuliahModule,
  ],
})
export class AppModule {}
