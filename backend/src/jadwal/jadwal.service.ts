import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJadwalDto, EditJadwalDto } from './dto';

@Injectable()
export class JadwalService {
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    verifyDosen(status){
        if(status !== 'dosen'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getJadwal(userStatus: string){
        this.verifyAdmin(userStatus)

        const jadwal = await this.prisma.jadwal.findMany({
            include: {
                dosen: true,
                matkul: true,
                kelas: true,
                tapel: true
            }
        })

        return {
            status: 'success',
            message: 'Data Jadwal Berhasil Ditampilkan',
            data: jadwal
        }
    }

    async getJadwalMe(userStatus: string, userId: number){

        this.verifyDosen(userStatus)

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const jadwal = await this.prisma.jadwal.findMany({
            where: {
                dosen_id: dosen.id
            },
            include: {
                matkul: true,
                kelas: true,
                tapel: true
            }
        })

        return {
            status: 'success',
            message: 'Data Jadwal Anda Berhasil Ditampilkan',
            data: jadwal
        }
    }

    async getJadwalById(userStatus: string, jadwalId: number){

        this.verifyAdmin(userStatus)
        const jadwal = await this.prisma.jadwal.findFirst({
            where: {
                id: jadwalId
            },
            include: {
                dosen: true,
                matkul: true,
                kelas: true,
                tapel: true
            }
        })

        if(!jadwal){
            throw new NotFoundException(
                'Data Jadwal Tidak Ditemukan'
            )
        }

        return {
            status: 'success',
            message: `Data Jadwal dengan ID : ${jadwalId} Berhasil Ditampilkan`,
            data: jadwal
        }
    }

    async createJadwal(userStatus: string, dto: CreateJadwalDto){

        this.verifyAdmin(userStatus)

        const jadwal = await this.prisma.jadwal.create({
            data: {
                ...dto
            }
        });

        return {
            status: 'success',
            message: 'Jadwal Berhasil Ditambahkan',
            data: jadwal
        }
  
    }

    async editJadwalById(userStatus: string, jadwalId: number, dto: EditJadwalDto){

        this.verifyAdmin(userStatus)

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: jadwalId
            }
        })

        if(!jadwal){
            throw new NotFoundException(
                'Data Jadwal Tidak Ditemukan'
            )
        }

        const editJadwal = await this.prisma.jadwal.update({
            where: {
                id: jadwalId
            },
            data: {
                ...dto
            }
        })

        return {
            status: 'success',
            message: 'Data Jadwal Berhasil Diedit',
            data: editJadwal
        }
    }

    async deleteJadwalById(userStatus: string, jadwalId: number){
        this.verifyAdmin(userStatus)

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: jadwalId
            }
        })

        if(!jadwal){
            throw new NotFoundException(
                'Data Jadwal Tidak Ditemukan'
            )
        }
        
        await this.prisma.jadwal.delete({
            where: {
                id: jadwalId
            }
        })

        return {
            status: 'success',
            message: 'Data Jadwal Berhasil Dihapus',
        }
    }
}
