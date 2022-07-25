import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateJurusanDto, EditJurusanDto } from './dto';
import { JurusanService } from './jurusan.service';

@UseGuards(JwtGuard)
@Controller('jurusan')
export class JurusanController {
    constructor(private jurusanService: JurusanService){}

    @Get()
    getJurusan(@GetUser('data') userData: string){
        return this.jurusanService.getJurusan(userData['status'])
    }
    
    @Get(':id')
    getJurusanById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) jurusanId: number
    ){
        return this.jurusanService.getJurusanById(userData['status'], jurusanId)
    }

    @Post()
    createJurusan(
        @GetUser('data') userData: string,
        @Body() dto: CreateJurusanDto
    ){
        return this.jurusanService.createJurusan(userData['status'], dto)
    }

    @Put(':id')
    editJurusanById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) jurusanId: number,
        @Body() dto: EditJurusanDto
    ){
        return this.jurusanService.editJurusanById(userData['status'], jurusanId, dto)
    }

    @Delete(':id')
    deleteJurusanById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) jurusanId: number,
    ){
        return this.jurusanService.deleteJurusanById(userData['status'], jurusanId)
    }
}
