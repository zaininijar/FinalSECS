import { ForbiddenException, Injectable, Req, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

@Injectable({})
export class AuthService{

    constructor(
        private Prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService 
    ){}

    async signup(dto: AuthDto){
        // generate the password hash
        const password = await argon.hash(dto.password);

        // save the new user in the db
        try{
            const user = await this.Prisma.user.create({
                data:{
                    username: dto.username,
                    password,
                    status: 'admin'
                }
            });

            const admin = await this.Prisma.admin.create({
                data:{
                    user_id: user.id,
                    name: 'nama admin'
                }
            });
    
            return this.signToken(user.id, user.username)

        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }

    async signin(dto: AuthDto, response: Response){
        // find the user by username
        const user = await this.Prisma.user.findUnique({
            where: {
                username: dto.username,
            }
        })
        // if user does not exist throw exception
        if(!user) throw new ForbiddenException("Credentials incorrect");
        
        // compare password
        const pwMatches = await argon.verify(
            user.password,
            dto.password
        );
        // if password incorrect throw exception
        if(!pwMatches) throw new ForbiddenException("Credentials incorrect");

        const token = await this.signToken(user.id, user.username)
        const frontendDomain = this.config.get<string>('FRONTEND_DOMAIN')

        response.cookie('jwt', token, {httpOnly: true, domain: frontendDomain,});
        return {'jwt': token}
    }

    async signToken(userId: number,username: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            username
        };

        const secret = this.config.get('JWT_SECRET')
        
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: secret
        })

        return {
            access_token: token 
        }

    }
}