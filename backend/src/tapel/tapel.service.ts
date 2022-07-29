import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTapelDto, EditTapelDto } from './dto';

@Injectable()
export class TapelService {
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getTapel(userStatus: string){
        this.verifyAdmin(userStatus)
        const tapel = await this.prisma.tahunPelajaran.findMany()

        return {
            status: 'success',
            message: 'Data Tahun Pelajaran Berhasil Ditampilkan',
            data: tapel
        }
    }

    async getTapelById(userStatus: string, tapelId: number){

        this.verifyAdmin(userStatus)
        const tapel = await this.prisma.tahunPelajaran.findFirst({
            where: {
                id: tapelId
            }
        })

        if(!tapel){
            throw new NotFoundException(
                'Data Tahun Pelajaran Tidak Ditemukan'
            )
        }

        return {
            status: 'success',
            message: `Data Tahun Pelajaran dengan ID : ${tapelId} Berhasil Ditampilkan`,
            data: tapel
        }
    }

    async createTapel(userStatus: string, dto: CreateTapelDto){

        this.verifyAdmin(userStatus)

        // save the new tapel in the db
        const tapel = await this.prisma.tahunPelajaran.create({
            data:{
                ...dto
            }
        });

        return {
            status: 'success',
            message: 'Tahun Pelajaran Berhasil Ditambahkan',
            data: tapel
        }
  
    }

    async editTapelById(userStatus: string, tapelId: number, dto: EditTapelDto){

        this.verifyAdmin(userStatus)

        // get the tapel and user by id
        const tapel = await this.prisma.tahunPelajaran.findUnique({
            where: {
                id: tapelId
            }
        })

        if(!tapel){
            throw new NotFoundException(
                'Data Tahun Pelajaran Tidak Ditemukan'
            )
        }

        const editTapel = await this.prisma.tahunPelajaran.update({
            where: {
                id: tapelId
            },
            data: {
                ...dto
            }
        })

        return {
            status: 'success',
            message: 'Data Tahun Pelajaran Berhasil Diedit',
            data: editTapel
        }
    }

    async deleteTapelById(userStatus: string, tapelId: number){
        this.verifyAdmin(userStatus)

        const tapel = await this.prisma.tahunPelajaran.findUnique({
            where: {
                id: tapelId
            }
        })

        if(!tapel){
            throw new NotFoundException(
                'Data Tahun Pelajaran Tidak Ditemukan'
            )
        }
        
        await this.prisma.tahunPelajaran.delete({
            where: {
                id: tapelId
            }
        })

        return {
            status: 'success',
            message: 'Data Tahun Pelajaran Berhasil Dihapus',
        }
    }
}
