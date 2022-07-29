import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatkulMahasiswaDto, EditMatkulMahasiswaDto } from './dto';

@Injectable()
export class MatkulMahasiswaService {
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getMatkulMahasiswa(userStatus: string){
        this.verifyAdmin(userStatus)
        const matakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.findMany({
            include: {
                mahasiswa: true,
                matkul: true
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Mahasiswa Berhasil Ditampilkan',
            data: matakuliahMahasiswa
        }
    }

    async getMatkulMahasiswaById(userStatus: string, matkulMahasiswaId: number){

        this.verifyAdmin(userStatus)
        const matakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.findFirst({
            where: {
                id: matkulMahasiswaId
            },
            include: {
                mahasiswa: true,
                matkul: true
            }
        })

        if(!matakuliahMahasiswa){
            throw new NotFoundException(
                'Data Matakuliah Mahasiswa Tidak Ditemukan'
            )
        }

        return {
            status: 'success',
            message: `Data Matakuliah Mahasiswa dengan ID : ${matkulMahasiswaId} Berhasil Ditampilkan`,
            data: matakuliahMahasiswa
        }
    }

    async createMatkulMahasiswa(userStatus: string, dto: CreateMatkulMahasiswaDto){

        this.verifyAdmin(userStatus)

        const matakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.create({
            data: {
                semester: dto.semester,
                mahasiswa_id: dto.mahasiswa_id,
                matkul_id: dto.matakuliah_id
            }
        });

        return {
            status: 'success',
            message: 'Matakuliah Mahasiswa Berhasil Ditambahkan',
            data: matakuliahMahasiswa
        }
  
    }

    async editMatkulMahasiswaById(userStatus: string, matkulMahasiswaId: number, dto: EditMatkulMahasiswaDto){

        this.verifyAdmin(userStatus)

        const matakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.findUnique({
            where: {
                id: matkulMahasiswaId
            }
        })

        if(!matakuliahMahasiswa){
            throw new NotFoundException(
                'Data Matakuliah Mahasiswa Tidak Ditemukan'
            )
        }

        const editMatakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.update({
            where: {
                id: matkulMahasiswaId
            },
            data: {
                mahasiswa_id: dto.mahasiswa_id,
                matkul_id: dto.matakuliah_id,
                semester: dto.semester,
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Mahasiswa Berhasil Diedit',
            data: editMatakuliahMahasiswa
        }
    }

    async deleteMatkulMahasiswaById(userStatus: string, matkulMahasiswaId: number){
        this.verifyAdmin(userStatus)

        const matakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.findUnique({
            where: {
                id: matkulMahasiswaId
            }
        })

        if(!matakuliahMahasiswa){
            throw new NotFoundException(
                'Data Matakuliah Mahasiswa Tidak Ditemukan'
            )
        }
        
        await this.prisma.matakuliahMahasiswa.delete({
            where: {
                id: matkulMahasiswaId
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Mahasiswa Berhasil Dihapus',
        }
    }
}
