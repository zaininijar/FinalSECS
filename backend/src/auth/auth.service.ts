import { ForbiddenException, Injectable, Req, Res } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, EditPasswordDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

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

    async signin(dto: AuthDto){
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
        return token
    }

    async token(dto: AuthDto){
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
        return token
    }

    async signToken(userId: number,username: string): Promise<{access_token: string}>{
        const payload = {
            sub: userId,
            username
        };

        const accessTokenSecret = this.config.get('JWT_SECRET')
        const refreshTokenSecret = this.config.get('REFRESH_TOKEN_SECRET')
        
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: accessTokenSecret
        })

        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: refreshTokenSecret
        })

        let token = {
            access_token: accessToken,
            refresh_token: refreshToken
        }

        return token

    }
}