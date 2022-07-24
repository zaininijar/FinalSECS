import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(config: ConfigService, private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {
        sub: number,
        username: string
    }){
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        if(user.status === "admin"){
            const detail = await this.prisma.admin.findFirst({
                where: {
                    user_id: user.id
                }
            })

            return {
                status: 'success',
                message: 'Data Berhasil Ditampilkan',
                data: {
                    id: user.id,
                    username: user.username,
                    name: detail.name,
                    status: user.status,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }

        }else if(user.status === "dosen"){
            const detail = await this.prisma.dosen.findFirst({
                where: {
                    user_id: user.id
                }
            });

            return {
                status: 'success',
                message: 'Berhasil',
                data: {
                    id: user.id,
                    username: user.username,
                    nip: detail.nip,
                    name: detail.name,
                    status: user.status,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }
        }else{
            const detail = await this.prisma.mahasiswa.findFirst({
                where: {
                    user_id: user.id
                }
            });

            return {

                status: 'success',
                message: 'Berhasil',
                data: {
                    id: user.id,
                    username: user.username,
                    nim: detail.nim,
                    name: detail.name,
                    status: user.status,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
                
            }
        }
        
    }
}