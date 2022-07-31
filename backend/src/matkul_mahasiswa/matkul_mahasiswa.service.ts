import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatkulMahasiswaDto, CreateMatkulMeDto, EditMatkulMahasiswaDto } from './dto';

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

    verifyMahasiswa(status){
        if(status !== 'mahasiswa'){
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


        const mahasiswa = await this.prisma.mahasiswa.findUnique({
            where: {
                id: dto.mahasiswa_id
            },
            include: {
                kelas: {
                    include: {
                        jurusan: true
                    }
                }
            }
        })

        const matakuliah = await this.prisma.matakuliah.findUnique({
            where: {
                id: dto.matkul_id
            }
        })

        if(mahasiswa.kelas.jurusan.id !== matakuliah.jurusan_id){
            throw new BadRequestException(
                'Anda tidak dapat memilih matakuliah dari Jurusan Lain'
            )
        }

        if(!matakuliah.matkulPilihan){
            throw new BadRequestException(
                'Anda tidak dapat memilih matakuliah ini'
            )
        }

        const matakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.create({
            data: {
                ...dto
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

        const mahasiswa = await this.prisma.mahasiswa.findUnique({
            where: {
                id: dto.mahasiswa_id
            },
            include: {
                kelas: {
                    include: {
                        jurusan: true
                    }
                }
            }
        })

        const matakuliah = await this.prisma.matakuliah.findUnique({
            where: {
                id: dto.matkul_id
            }
        })

        if(mahasiswa.kelas.jurusan.id !== matakuliah.jurusan_id){
            throw new BadRequestException(
                'Anda tidak dapat memilih matakuliah dari Jurusan Lain'
            )
        }

        if(!matakuliah.matkulPilihan){
            throw new BadRequestException(
                'Anda tidak dapat memilih matakuliah ini'
            )
        }

        const editMatakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.update({
            where: {
                id: matkulMahasiswaId
            },
            data: {
                ...dto
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

    async getMatkulMe(userStatus: string, userId: number){
        this.verifyMahasiswa(userStatus)

        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                user_id: userId
            }
        })

        const matakuliahMahasiswa = await this.prisma.matakuliahMahasiswa.findMany({
            where: {
                mahasiswa_id: mahasiswa.id
            },
            include: {
                mahasiswa: true,
                matkul: true
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Anda Berhasil Ditampilkan',
            data: matakuliahMahasiswa
        }
    }

    async createMatkulMe(userStatus: string, userId: number, dto: CreateMatkulMeDto){

        this.verifyMahasiswa(userStatus)


        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                user_id: userId
            },
            include: {
                kelas: {
                    include: {
                        jurusan: true
                    }
                }
            }
        })

        const matakuliah = await this.prisma.matakuliah.findUnique({
            where: {
                id: dto.matkul_id
            }
        })

        if(mahasiswa.kelas.jurusan.id !== matakuliah.jurusan_id){
            throw new BadRequestException(
                'Anda tidak dapat memilih matakuliah dari Jurusan Lain'
            )
        }

        if(!matakuliah.matkulPilihan){
            throw new BadRequestException(
                'Anda tidak dapat memilih matakuliah ini'
            )
        }

        const createMatakuliahMe = await this.prisma.matakuliahMahasiswa.create({
            data: {
                mahasiswa_id: mahasiswa.id,
                matkul_id: dto.matkul_id
            }
        });

        return {
            status: 'success',
            message: 'Matakuliah Anda Berhasil Ditambahkan',
            data: createMatakuliahMe
        }
  
    }

    async deleteMatkulMeById(userStatus: string, userId: number, matkulMeId: number){
        this.verifyMahasiswa(userStatus)

        const matakuliahMe = await this.prisma.matakuliahMahasiswa.findUnique({
            where: {
                id: matkulMeId
            }
        })

        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                user_id: userId
            }
        })

        if(!matakuliahMe){
            throw new NotFoundException(
                'Data Matakuliah Anda Tidak Ditemukan'
            )
        }

        if(matakuliahMe.mahasiswa_id !== mahasiswa.id){
            throw new ForbiddenException(
                'Anda Tidak Bisa Menghapus Matakuliah Mahasiswa Lain'
            )
        }
        
        await this.prisma.matakuliahMahasiswa.delete({
            where: {
                id: matkulMeId
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Anda Berhasil Dihapus',
        }
    }
}
