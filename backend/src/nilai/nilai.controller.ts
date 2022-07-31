import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateNilaiDto, EditNilaiDto } from './dto';
import { NilaiService } from './nilai.service';

@UseGuards(JwtGuard)
@Controller('nilai')
export class NilaiController {
    constructor(private nilaiService: NilaiService){}

    @Get('me')
    getNilaiMe(
        @GetUser('data') userData
    ){
        return this.nilaiService.getNilaiMe(userData['status'], userData['id'])
    }
    
    @Get('ipk')
    getIPK(
        @GetUser('data') userData
    ){
        return this.nilaiService.getIPK(userData['status'], userData['id'])
    }

    @Get(':id')
    getNilaiById(
        @GetUser('data') userData,
        @Param('id', ParseIntPipe) nilaiId: number
    ){
        return this.nilaiService.getNilaiById(userData['status'], userData['id'], nilaiId)
    }

    @Get('matakuliah/:id/:idTapel')
    getNilaiByMatkulId(
        @GetUser('data') userData,
        @Param('id', ParseIntPipe) mapelId: number,
        @Param('idTapel', ParseIntPipe) tapelId: number
    ){
        return this.nilaiService.getNilaiByMatkulId(userData['status'], userData['id'], mapelId, tapelId)
    }

    @Get()
    getNilaiByNim(
        @GetUser('data') userData: string,
        @Query('nim') nim: string
    ) {
        return this.nilaiService.getNilaiByNim(userData['status'], nim)
    }
    

    @Post()
    createNilai(
        @GetUser('data') userData: string,
        @Body() dto: CreateNilaiDto
    ){
        return this.nilaiService.createNilai(userData['status'], userData['id'], dto)
    }

    @Put(':id')
    editNilaiById(
        @GetUser('data') userData,
        @Param('id', ParseIntPipe) nilaiId: number,
        @Body() dto: EditNilaiDto
    ){
        return this.nilaiService.editNilaiById(userData['status'],userData['id'], nilaiId, dto)
    }

    @Delete(':id')
    deleteNilaiById(
        @GetUser('data') userData,
        @Param('id', ParseIntPipe) nilaiId: number,
    ){
        return this.nilaiService.deleteNilaiById(userData['status'],userData['id'], nilaiId)
    }
}
