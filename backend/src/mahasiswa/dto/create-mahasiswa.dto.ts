import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMahasiswaDto{
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    nim: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    kelas_id: number;

}