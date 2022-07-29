import { IsInt, IsNotEmpty } from "class-validator";

export class CreateMatkulMahasiswaDto{
    @IsInt()
    @IsNotEmpty()
    mahasiswa_id: number;

    @IsInt()
    @IsNotEmpty()
    matakuliah_id: number;

    @IsInt()
    @IsNotEmpty()
    semester: number;
}