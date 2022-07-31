import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListMahasiswaService {
    constructor(private prisma: PrismaService){}

    verifyDosen(status){
        if(status !== 'dosen'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getListName(userStatus: string, userId: number, jadwalId: number){
        this.verifyDosen(userStatus)

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: jadwalId
            }
        })

        if(!jadwal){
            throw new NotFoundException(
                'Jadwal Tidak Ditemukan'
            )
        }

        if(dosen.id !== jadwal.dosen_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Request Ini!'
            )
        }

        const mahasiswa = await this.prisma.mahasiswa.findMany({
            where: {
                kelas_id: jadwal.kelas_id
            }
        })

        return {
            status: 'success',
            message: 'List Mahasiswa Berhasil Ditampilkan',
            data: mahasiswa
        }
    }
    
    
}
