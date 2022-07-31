import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListMatakuliahService {
    constructor(private prisma: PrismaService){}

    verifyMahasiswa(status){
        if(status !== 'mahasiswa'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }
    
    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getListMatkulMe(userStatus: string, userId: number){
        this.verifyMahasiswa(userStatus)

        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                user_id: userId
            },
            include: {
                kelas: {
                    select: {
                        jurusan: true
                    }
                }
            }
        })

        const matakuliah = await this.prisma.matakuliah.findMany({
            where: {
                jurusan_id: mahasiswa.kelas.jurusan.id,
                matkulPilihan: true
            }
        })

        return {
            status: 'success',
            message: 'List Matakuliah Berhasil Ditampilkan',
            data: matakuliah
        }
    }

    async getListMatkul(userStatus: string){
        this.verifyAdmin(userStatus)

        const matakuliah = await this.prisma.matakuliah.findMany({
            where: {
                matkulPilihan: true
            }
        })

        return {
            status: 'success',
            message: 'List Matakuliah Berhasil Ditampilkan',
            data: matakuliah
        }
    }
}
