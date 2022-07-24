import { Body, Controller, Post } from '@nestjs/common';
import { MahasiswaDto } from './dto';
import { MahasiswaService } from './mahasiswa.service';

@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private mahasiswaService: MahasiswaService){}

    @Post()
    create(@Body() dto: MahasiswaDto){
        return this.mahasiswaService.create(dto);
    }
}
