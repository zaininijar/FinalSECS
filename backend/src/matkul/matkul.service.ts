import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatakuliahDto, EditMatakuliahDto } from './dto';

@Injectable()
export class MatkulService {
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getMatkul(userStatus: string){
        this.verifyAdmin(userStatus)
        const matakuliah = await this.prisma.matakuliah.findMany({
            include: {
                jurusan: true
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Berhasil Ditampilkan',
            data: matakuliah
        }
    }

    async getMatkulById(userStatus: string, matkulId: number){

        this.verifyAdmin(userStatus)
        const matakuliah = await this.prisma.matakuliah.findFirst({
            where: {
                id: matkulId
            },
            include: {
                jurusan: true
            }
        })

        if(!matakuliah){
            throw new NotFoundException(
                'Data Matakuliah Tidak Ditemukan'
            )
        }

        delete matakuliah.jurusan_id

        return {
            status: 'success',
            message: `Data Matakuliah dengan ID : ${matkulId} Berhasil Ditampilkan`,
            data: matakuliah
        }
    }

    async createMatkul(userStatus: string, dto: CreateMatakuliahDto){

        this.verifyAdmin(userStatus)

        // save the new matakuliah in the db
        const matakuliah = await this.prisma.matakuliah.create({
            data:{
                ...dto
            }
        });

        return {
            status: 'success',
            message: 'Matakuliah Berhasil Ditambahkan',
            data: matakuliah
        }
  
    }

    async editMatkulById(userStatus: string, matkulId: number, dto: EditMatakuliahDto){

        this.verifyAdmin(userStatus)

        // get the matakuliah and user by id
        const matakuliah = await this.prisma.matakuliah.findUnique({
            where: {
                id: matkulId
            }
        })

        if(!matakuliah){
            throw new NotFoundException(
                'Data Matakuliah Tidak Ditemukan'
            )
        }

        const editMatakuliah = await this.prisma.matakuliah.update({
            where: {
                id: matkulId
            },
            data: {
                ...dto
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Berhasil Diedit',
            data: editMatakuliah
        }
    }

    async deleteMatkulById(userStatus: string, matkulId: number){
        this.verifyAdmin(userStatus)

        const matakuliah = await this.prisma.matakuliah.findUnique({
            where: {
                id: matkulId
            }
        })

        if(!matakuliah){
            throw new NotFoundException(
                'Data Matakuliah Tidak Ditemukan'
            )
        }
        
        await this.prisma.matakuliah.delete({
            where: {
                id: matkulId
            }
        })

        return {
            status: 'success',
            message: 'Data Matakuliah Berhasil Dihapus',
        }
    }
}
