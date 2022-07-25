import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateKelasDto{
    @IsString()
    @IsNotEmpty()
    nama_kelas: string;

    @IsInt()
    @IsNotEmpty()
    jurusan_id: number
}