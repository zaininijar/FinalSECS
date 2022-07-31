import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateNilaiDto{
    @IsInt()
    @IsNotEmpty()
    mahasiswa_id: number;
    
    @IsInt()
    @IsNotEmpty()
    jadwal_id: number;

    @IsString()
    @IsNotEmpty()
    nilai: string;
}