import {IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMatakuliahDto{
    @IsString()
    @IsNotEmpty()
    kode_matakuliah: string;

    @IsString()
    @IsNotEmpty()
    nama_matakuliah: string;

    @IsString()
    @IsNotEmpty()
    semester: string;

    @IsString()
    @IsNotEmpty()
    sks: string;

    @IsInt()
    @IsNotEmpty()
    jurusan_id: number;
}