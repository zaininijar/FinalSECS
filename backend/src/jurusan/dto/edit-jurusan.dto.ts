import { IsOptional, IsString } from "class-validator";

export class EditJurusanDto{
    @IsString()
    @IsOptional()
    nama_jurusan: string;
}