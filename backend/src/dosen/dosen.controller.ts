import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { DosenService } from './dosen.service';
import { CreateDosenDto, EditDosenDto } from './dto';

@UseGuards(JwtGuard)
@Controller('dosen')
export class DosenController {
    constructor(private dosenService: DosenService){}

    @Get()
    getDosen(@GetUser('data') userData: string){
        return this.dosenService.getDosen(userData['status'])
    }
    
    @Get(':id')
    getDosenById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) dosenId: number
    ){
        return this.dosenService.getDosenById(userData['status'], dosenId)
    }

    @Post()
    createDosen(
        @GetUser('data') userData: string,
        @Body() dto: CreateDosenDto
    ){
        return this.dosenService.createDosen(userData['status'], dto)
    }

    @Put(':id')
    editDosenById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) dosenId: number,
        @Body() dto: EditDosenDto
    ){
        return this.dosenService.editDosenById(userData['status'], dosenId, dto)
    }

    @Delete(':id')
    deleteDosenById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) dosenId: number,
    ){
        return this.dosenService.deleteDosenById(userData['status'], dosenId)
    }

}
