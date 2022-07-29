import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateMatkulMahasiswaDto, EditMatkulMahasiswaDto } from './dto';
import { MatkulMahasiswaService } from './matkul_mahasiswa.service';

@UseGuards(JwtGuard)
@Controller('matakuliah-mahasiswa')
export class MatkulMahasiswaController {
    constructor(private matkulMahasiswaService: MatkulMahasiswaService){}

    @Get()
    getMatkulMahasiswa(@GetUser('data') userData: string){
        return this.matkulMahasiswaService.getMatkulMahasiswa(userData['status'])
    }
    
    @Get(':id')
    getMatkulMahasiswaById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) matkulMahasiswaId: number
    ){
        return this.matkulMahasiswaService.getMatkulMahasiswaById(userData['status'], matkulMahasiswaId)
    }

    @Post()
    createMatkulMahasiswa(
        @GetUser('data') userData: string,
        @Body() dto: CreateMatkulMahasiswaDto
    ){
        return this.matkulMahasiswaService.createMatkulMahasiswa(userData['status'], dto)
    }

    @Put(':id')
    editMatkulMahasiswaById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) matkulMahasiswaId: number,
        @Body() dto: EditMatkulMahasiswaDto
    ){
        return this.matkulMahasiswaService.editMatkulMahasiswaById(userData['status'], matkulMahasiswaId, dto)
    }

    @Delete(':id')
    deleteMatkulMahasiswaById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) matkulMahasiswaId: number,
    ){
        return this.matkulMahasiswaService.deleteMatkulMahasiswaById(userData['status'], matkulMahasiswaId)
    }
}
