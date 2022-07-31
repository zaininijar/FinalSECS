import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateNilaiDto{
    @IsInt()
    @IsNotEmpty()
    mahasiswa_id: number;

    @IsInt()
    @IsNotEmpty()
    matkul_id: number;
    
    @IsInt()
    @IsNotEmpty()
    tapel_id: number;

    @IsString()
    @IsNotEmpty()
    nilai: string;
}