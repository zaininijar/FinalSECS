import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ListMahasiswaService } from './list_mahasiswa.service';

@UseGuards(JwtGuard)
@Controller('list-mahasiswa')
export class ListMahasiswaController {
    constructor(private listService: ListMahasiswaService){}

    @Get(':id')
    getListName(
        @GetUser('data') userData,
        @Param('id', ParseIntPipe) jadwalId: number
    ){
        return this.listService.getListName(userData['status'], userData['id'], jadwalId)
    }
}
