import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ListMatakuliahService } from './list_matakuliah.service';

@UseGuards(JwtGuard)
@Controller('list-matakuliah')
export class ListMatakuliahController {
    constructor(private listService: ListMatakuliahService){}

    @Get('me')
    getListMatkulMe(
        @GetUser('data') userData
    ){
        return this.listService.getListMatkulMe(userData['status'], userData['id'])
    }

    @Get()
    getListMatkul(
        @GetUser('data') userData
    ){
        return this.listService.getListMatkul(userData['status'])
    }
}
