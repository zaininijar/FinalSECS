import {IsBoolean, IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class EditMatakuliahDto{
    @IsString()
    @IsOptional()
    kode_matakuliah: string;

    @IsString()
    @IsOptional()
    nama_matakuliah: string;

    @IsInt()
    @IsOptional()
    semester: number;

    @IsInt()
    @IsOptional()
    sks: number;

    @IsBoolean()
    @IsOptional()
    matkulPilihan: boolean;

    @IsInt()
    @IsOptional()
    jurusan_id: number;
}