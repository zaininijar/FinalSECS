import { Body, Controller, Get, Patch, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { EditPasswordDto } from 'src/auth/dto';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Get('me')
    getMe(@GetUser() user: User){
        return user
    }

    @Put('change-password')
    editPassword( 
        @GetUser('data') userData: string,
        @Body() dto: EditPasswordDto
    ){
        return this.userService.editPassword(userData['id'], dto)
    }

    // @Patch()
    // editUser(){}
}
