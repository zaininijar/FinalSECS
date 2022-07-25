import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class EditMahasiswaDto{
    @IsString()
    @IsOptional()
    username: string;
    
    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    nim: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsInt()
    @IsOptional()
    kelas_id: number;

}