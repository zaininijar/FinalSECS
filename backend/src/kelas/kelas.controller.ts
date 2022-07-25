import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateKelasDto, EditKelasDto } from './dto';
import { KelasService } from './kelas.service';

@UseGuards(JwtGuard)
@Controller('kelas')
export class KelasController {
    constructor(private kelasService: KelasService){}

    @Get()
    getKelas(@GetUser('data') userData: string){
        return this.kelasService.getKelas(userData['status'])
    }
    
    @Get(':id')
    getKelasById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) kelasId: number
    ){
        return this.kelasService.getKelasById(userData['status'], kelasId)
    }

    @Post()
    createKelas(
        @GetUser('data') userData: string,
        @Body() dto: CreateKelasDto
    ){
        return this.kelasService.createKelas(userData['status'], dto)
    }

    @Put(':id')
    editKelasById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) kelasId: number,
        @Body() dto: EditKelasDto
    ){
        return this.kelasService.editKelasById(userData['status'], kelasId, dto)
    }

    @Delete(':id')
    deleteKelasById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) kelasId: number,
    ){
        return this.kelasService.deleteKelasById(userData['status'], kelasId)
    }
}
