import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { EditPasswordDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async editPassword(userId: number, dto: EditPasswordDto){
        // find the user by id
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        // if user does not exist throw exception
        if(!user) throw new ForbiddenException("Credentials incorrect");
        
        // compare password
        const pwMatches = await argon.verify(
            user.password,
            dto.oldPassword
        );

        // if password incorrect throw exception
        if(!pwMatches) throw new BadRequestException("Password yang anda masukkan salah");

        const newPwd = await argon.hash(dto.newPassword);
        const editPwd = await this.prisma.user.update({
            where: {
                id: userId
            },
            data:{
                password: newPwd
            }
        });

        return {
            status: 'success',
            message: `Password berhasil di edit`
        }
    }
}
