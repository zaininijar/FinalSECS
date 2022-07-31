import {IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMatakuliahDto{
    @IsString()
    @IsNotEmpty()
    kode_matakuliah: string;

    @IsString()
    @IsNotEmpty()
    nama_matakuliah: string;

    @IsInt()
    @IsNotEmpty()
    semester: number;

    @IsInt()
    @IsNotEmpty()
    sks: number;

    @IsBoolean()
    @IsNotEmpty()
    matkulPilihan: boolean;

    @IsInt()
    @IsNotEmpty()
    jurusan_id: number;
}