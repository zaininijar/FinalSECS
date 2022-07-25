import { IsNotEmpty, IsString } from "class-validator";

export class CreateDosenDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    nip: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}