import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateJadwalDto, EditJadwalDto } from './dto';
import { JadwalService } from './jadwal.service';

@UseGuards(JwtGuard)
@Controller('jadwal')
export class JadwalController {
    constructor(private jadwalService: JadwalService){}

    @Get()
    getJadwal(@GetUser('data') userData: string){
        return this.jadwalService.getJadwal(userData['status'])
    }

    @Get('me')
    getJadwalMe(@GetUser('data') userData){
        return this.jadwalService.getJadwalMe(userData['status'], userData['id'])
    }
    
    @Get(':id')
    getJadwalById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) jadwalId: number
    ){
        return this.jadwalService.getJadwalById(userData['status'], jadwalId)
    }

    @Post()
    createJadwal(
        @GetUser('data') userData: string,
        @Body() dto: CreateJadwalDto
    ){
        return this.jadwalService.createJadwal(userData['status'], dto)
    }

    @Put(':id')
    editJadwalById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) jadwalId: number,
        @Body() dto: EditJadwalDto
    ){
        return this.jadwalService.editJadwalById(userData['status'], jadwalId, dto)
    }

    @Delete(':id')
    deleteJadwalById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) jadwalId: number,
    ){
        return this.jadwalService.deleteJadwalById(userData['status'], jadwalId)
    }
}
