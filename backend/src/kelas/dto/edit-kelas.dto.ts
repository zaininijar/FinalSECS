import { IsInt, IsOptional, IsString } from "class-validator";

export class EditKelasDto{
    @IsString()
    @IsOptional()
    nama_kelas: string;

    @IsInt()
    @IsOptional()
    jurusan_id: number
}