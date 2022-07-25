import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMahasiswaDto, EditMahasiswaDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class MahasiswaService{
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getMahasiswa(userStatus: string){
        this.verifyAdmin(userStatus)
        const mahasiswa = await this.prisma.mahasiswa.findMany()

        return {
            status: 'success',
            message: 'Data Mahasiswa Berhasil Ditampilkan',
            data: mahasiswa
        }
    }

    async getMahasiswaById(userStatus: string, mahasiswaId: number){
        this.verifyAdmin(userStatus)
        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                id: mahasiswaId
            }
        })

        return {
            status: 'success',
            message: `Data Mahasiswa dengan ID : ${mahasiswaId} Berhasil Ditampilkan`,
            data: mahasiswa
        }
    }

    async createMahasiswa(userStatus: string, dto: CreateMahasiswaDto){

        this.verifyAdmin(userStatus)

        // generate the password hash
        const password = await argon.hash(dto.password);

        // save the new user in the db
        const user = await this.prisma.user.create({
            data:{
                username: dto.username,
                password: password,
                status: 'mahasiswa'
            }
        });

        const mahasiswa = await this.prisma.mahasiswa.create({
            data:{
                user_id: user.id,
                nim: dto.nim,
                name: dto.name,
                kelas_id: dto.kelas_id
            }
        });

        return {
            status: 'success',
            message: 'Mahasiswa Berhasil Ditambahkan',
            data: {
                id: mahasiswa.id,
                username: user.username,
                nim: mahasiswa.nim,
                name: mahasiswa.name,
                kelas_id: mahasiswa.kelas_id
            }
        }
  
    }

    async editMahasiswaById(userStatus: string, mahasiswaId: number, dto: EditMahasiswaDto){
        this.verifyAdmin(userStatus)

        // get the mahasiswa and user by id
        const mahasiswa = await this.prisma.mahasiswa.findUnique({
            where: {
                id: mahasiswaId
            }
        })

        if(!mahasiswa){
            throw new NotFoundException(
                'Data Mahasiswa Tidak Ditemukan'
            )
        }

        const editMahasiswa = await this.prisma.mahasiswa.update({
            where: {
                id: mahasiswaId
            },
            data: {
                nim: dto.nim,
                name: dto.name,
                kelas_id: dto.kelas_id
            }
        })


        let password

        if(dto.password){
            // generate the password hash
            password = await argon.hash(dto.password);
        }

        const editUser = await this.prisma.user.update({
            where: {
                id: mahasiswa.user_id
            },
            data: {
                username: dto.username,
                password: password
            }
        })
        

        return {
            status: 'success',
            message: 'Data Mahasiswa Berhasil Diedit',
            data: {
                id: editMahasiswa.id,
                username: editUser.username,
                nim: editMahasiswa.nim,
                name: editMahasiswa.name,
                kelas_id: editMahasiswa.kelas_id
            }
        }
    }

    async deleteMahasiswaById(userStatus: string, mahasiswaId: number){
        this.verifyAdmin(userStatus)

        const mahasiswa = await this.prisma.mahasiswa.findUnique({
            where: {
                id: mahasiswaId
            }
        })

        if(!mahasiswa){
            throw new NotFoundException(
                'Data Mahasiswa Tidak Ditemukan'
            )
        }
        
        await this.prisma.mahasiswa.delete({
            where: {
                id: mahasiswaId
            }
        })
        
        await this.prisma.user.delete({
            where: {
                id: mahasiswa.user_id
            }
        })

        return {
            status: 'success',
            message: 'Data Mahasiswa Berhasil Dihapus',
        }
    }
}