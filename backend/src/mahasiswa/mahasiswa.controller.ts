import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateMahasiswaDto, EditMahasiswaDto } from './dto';
import { MahasiswaService } from './mahasiswa.service';

@UseGuards(JwtGuard)
@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private mahasiswaService: MahasiswaService){}

    @Get()
    getMahasiswa(@GetUser('data') userData: string){
        return this.mahasiswaService.getMahasiswa(userData['status'])
    }
    
    @Get(':id')
    getmahasiswaById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) mahasiswaId: number
    ){
        return this.mahasiswaService.getMahasiswaById(userData['status'], mahasiswaId)
    }

    @Post()
    createMahasiswa(
        @GetUser('data') userData: string,
        @Body() dto: CreateMahasiswaDto
    ){
        return this.mahasiswaService.createMahasiswa(userData['status'], dto)
    }

    @Put(':id')
    editMahasiswaById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) mahasiswaId: number,
        @Body() dto: EditMahasiswaDto
    ){
        return this.mahasiswaService.editMahasiswaById(userData['status'], mahasiswaId, dto)
    }

    @Delete(':id')
    deleteMahasiswaById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) mahasiswaId: number,
    ){
        return this.mahasiswaService.deleteMahasiswaById(userData['status'], mahasiswaId)
    }

}