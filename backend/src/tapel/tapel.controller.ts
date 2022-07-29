import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateTapelDto, EditTapelDto } from './dto';
import { TapelService } from './tapel.service';

@UseGuards(JwtGuard)
@Controller('tahun-pelajaran')
export class TapelController {
    constructor(private tapelService: TapelService){}

    @Get()
    getTapel(@GetUser('data') userData: string){
        return this.tapelService.getTapel(userData['status'])
    }
    
    @Get(':id')
    getTapelById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) tapelId: number
    ){
        return this.tapelService.getTapelById(userData['status'], tapelId)
    }

    @Post()
    createTapel(
        @GetUser('data') userData: string,
        @Body() dto: CreateTapelDto
    ){
        return this.tapelService.createTapel(userData['status'], dto)
    }

    @Put(':id')
    editTapelById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) tapelId: number,
        @Body() dto: EditTapelDto
    ){
        return this.tapelService.editTapelById(userData['status'], tapelId, dto)
    }

    @Delete(':id')
    deleteTapelById(
        @GetUser('data') userData: string,
        @Param('id', ParseIntPipe) tapelId: number,
    ){
        return this.tapelService.deleteTapelById(userData['status'], tapelId)
    }
}
