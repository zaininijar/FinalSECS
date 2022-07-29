import { IsInt, IsOptional } from "class-validator";

export class EditMatkulMahasiswaDto{
    @IsInt()
    @IsOptional()
    mahasiswa_id: number;

    @IsInt()
    @IsOptional()
    matakuliah_id: number;

    @IsInt()
    @IsOptional()
    semester: number;
}