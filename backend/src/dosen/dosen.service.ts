import { ForbiddenException, Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { DosenDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class DosenService{
    constructor(
        private Prisma: PrismaService, 
    ){}

    async create(dto: DosenDto){
        // generate the password hash
        const password = await argon.hash(dto.password);

        // save the new user in the db
        try{
            const user = await this.Prisma.user.create({
                data:{
                    username: dto.username,
                    password: password,
                    status: 'dosen'
                }
            });

            const dosen = await this.Prisma.dosen.create({
                data:{
                    user_id: user.id,
                    nip: dto.nip,
                    name: dto.name
                }
            });

            return {
                status: 'success',
                message: 'Dosen Berhasil Ditambahkan',
                data: {
                    id: dosen.id,
                    username: user.username,
                    nip: dosen.nip,
                    name: dosen.name
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