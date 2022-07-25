import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateMatakuliahDto, EditMatakuliahDto } from './dto';
import { MatkulService } from './matkul.service';

@UseGuards(JwtGuard)
@Controller('matakuliah')
export class MatkulController {
    constructor(private matkulService: MatkulService){}

    @Get()
    getMatkul(@GetUser('data') userData: string){
        return this.matkulService.getMatkul(userData['status'])
    }
    
    @Get(':id')
    getMatkulById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) matkulId: number
    ){
        return this.matkulService.getMatkulById(userData['status'], matkulId)
    }

    @Post()
    createMatkul(
        @GetUser('data') userData: string,
        @Body() dto: CreateMatakuliahDto
    ){
        return this.matkulService.createMatkul(userData['status'], dto)
    }

    @Put(':id')
    editMatkulById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) matkulId: number,
        @Body() dto: EditMatakuliahDto
    ){
        return this.matkulService.editMatkulById(userData['status'], matkulId, dto)
    }

    @Delete(':id')
    deleteMatkulById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) matkulId: number,
    ){
        return this.matkulService.deleteMatkulById(userData['status'], matkulId)
    }
}
