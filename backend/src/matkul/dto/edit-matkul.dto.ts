import {IsInt, IsOptional, IsString } from "class-validator";

export class EditMatakuliahDto{
    @IsString()
    @IsOptional()
    kode_matakuliah: string;

    @IsString()
    @IsOptional()
    nama_matakuliah: string;

    @IsString()
    @IsOptional()
    semester: string;

    @IsString()
    @IsOptional()
    sks: string;

    @IsInt()
    @IsOptional()
    jurusan_id: number;
}