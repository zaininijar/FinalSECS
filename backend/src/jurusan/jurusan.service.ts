import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJurusanDto, EditJurusanDto } from './dto';

@Injectable()
export class JurusanService {
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getJurusan(userStatus: string){
        this.verifyAdmin(userStatus)
        const jurusan = await this.prisma.jurusan.findMany()

        return {
            status: 'success',
            message: 'Data Jurusan Berhasil Ditampilkan',
            data: jurusan
        }
    }

    async getJurusanById(userStatus: string, jurusanId: number){

        this.verifyAdmin(userStatus)
        const jurusan = await this.prisma.jurusan.findFirst({
            where: {
                id: jurusanId
            }
        })

        if(!jurusan){
            throw new NotFoundException(
                'Data Jurusan Tidak Ditemukan'
            )
        }

        return {
            status: 'success',
            message: `Data Jurusan dengan ID : ${jurusanId} Berhasil Ditampilkan`,
            data: jurusan
        }
    }

    async createJurusan(userStatus: string, dto: CreateJurusanDto){

        this.verifyAdmin(userStatus)

        // save the new jurusan in the db
        const jurusan = await this.prisma.jurusan.create({
            data:{
                nama_jurusan: dto.nama_jurusan
            }
        });

        return {
            status: 'success',
            message: 'Jurusan Berhasil Ditambahkan',
            data: jurusan
        }
  
    }

    async editJurusanById(userStatus: string, jurusanId: number, dto: EditJurusanDto){

        this.verifyAdmin(userStatus)

        // get the jurusan and user by id
        const jurusan = await this.prisma.jurusan.findUnique({
            where: {
                id: jurusanId
            }
        })

        if(!jurusan){
            throw new NotFoundException(
                'Data Jurusan Tidak Ditemukan'
            )
        }

        const editJurusan = await this.prisma.jurusan.update({
            where: {
                id: jurusanId
            },
            data: {
                nama_jurusan: dto.nama_jurusan
            }
        })

        return {
            status: 'success',
            message: 'Data Jurusan Berhasil Diedit',
            data: editJurusan
        }
    }

    async deleteJurusanById(userStatus: string, jurusanId: number){
        this.verifyAdmin(userStatus)

        const jurusan = await this.prisma.jurusan.findUnique({
            where: {
                id: jurusanId
            }
        })

        if(!jurusan){
            throw new NotFoundException(
                'Data Jurusan Tidak Ditemukan'
            )
        }
        
        await this.prisma.jurusan.delete({
            where: {
                id: jurusanId
            }
        })

        return {
            status: 'success',
            message: 'Data Jurusan Berhasil Dihapus',
        }
    }
}
