import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MahasiswaDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class MahasiswaService{
    constructor(
        private Prisma: PrismaService,
    ){}

    async create(dto: MahasiswaDto){
        console.log(dto.name)
        // generate the password hash
        const password = await argon.hash(dto.password);

        // save the new user in the db
        try{
            const user = await this.Prisma.user.create({
                data:{
                    username: dto.username,
                    password: password,
                    status: 'mahasiswa'
                }
            });

            const mahasiswa = await this.Prisma.mahasiswa.create({
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

        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }
}