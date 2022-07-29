import { IsNotEmpty, IsString } from "class-validator";

export class CreateTapelDto{
    @IsString()
    @IsNotEmpty()
    tahun_pelajaran: string;
}