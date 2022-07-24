import { Body, Controller, Post } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { DosenDto } from './dto';

@Controller('dosen')
export class DosenController {
    constructor(private dosenService: DosenService){}

    @Post()
    create(@Body() dto: DosenDto){
        return this.dosenService.create(dto)
    }

}
