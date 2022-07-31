import { IsInt, IsOptional } from "class-validator";

export class EditMatkulMahasiswaDto{
    @IsInt()
    @IsOptional()
    mahasiswa_id: number;

    @IsInt()
    @IsOptional()
    matkul_id: number;
}