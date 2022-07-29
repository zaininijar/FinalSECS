import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateKelasDto, EditKelasDto } from './dto';

@Injectable()
export class KelasService {
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getKelas(userStatus: string){
        this.verifyAdmin(userStatus)
        const kelas = await this.prisma.kelas.findMany({
            include: {
                jurusan: true,
            },
            
        })

        return {
            status: 'success',
            message: 'Data Kelas Berhasil Ditampilkan',
            data: kelas
        }
    }

    async getKelasById(userStatus: string, kelasId: number){

        this.verifyAdmin(userStatus)
        const kelas = await this.prisma.kelas.findFirst({
            where: {
                id: kelasId
            },
            include: {
                jurusan: true
            }
        })

        if(!kelasId){
            throw new NotFoundException(
                'Data Kelas Tidak Ditemukan'
            )
        }

        delete kelas.jurusan_id

        return {
            status: 'success',
            message: `Data Kelas dengan ID : ${kelasId} Berhasil Ditampilkan`,
            data: kelas
        }
    }

    async createKelas(userStatus: string, dto: CreateKelasDto){

        this.verifyAdmin(userStatus)

        // save the new kelas in the db
        const kelas = await this.prisma.kelas.create({
            data:{
                nama_kelas: dto.nama_kelas,
                jurusan_id: dto.jurusan_id
            }
        });

        return {
            status: 'success',
            message: 'Kelas Berhasil Ditambahkan',
            data: kelas
        }
  
    }

    async editKelasById(userStatus: string, kelasId: number, dto: EditKelasDto){

        this.verifyAdmin(userStatus)

        // get the kelas and user by id
        const kelas = await this.prisma.kelas.findUnique({
            where: {
                id: kelasId
            }
        })

        if(!kelas){
            throw new NotFoundException(
                'Data Kelas Tidak Ditemukan'
            )
        }

        
        const editKelas = await this.prisma.kelas.update({
            where: {
                id: kelasId
            },
            data: {
                ...dto
            }
        })

        
        return {
            status: 'success',
            message: 'Data Kelas Berhasil Diedit',
            data: editKelas
        }
    }

    async deleteKelasById(userStatus: string, kelasId: number){
        this.verifyAdmin(userStatus)

        const kelas = await this.prisma.kelas.findUnique({
            where: {
                id: kelasId
            }
        })

        if(!kelas){
            throw new NotFoundException(
                'Data Kelas Tidak Ditemukan'
            )
        }
        
        await this.prisma.kelas.delete({
            where: {
                id: kelasId
            }
        })

        return {
            status: 'success',
            message: 'Data Kelas Berhasil Dihapus',
        }
    }
}
