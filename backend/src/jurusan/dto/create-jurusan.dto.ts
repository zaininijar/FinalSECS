import { IsNotEmpty, IsString } from "class-validator";

export class CreateJurusanDto{
    @IsString()
    @IsNotEmpty()
    nama_jurusan: string;
}