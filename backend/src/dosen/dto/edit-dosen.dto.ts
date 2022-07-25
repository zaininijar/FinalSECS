import { IsOptional, IsString } from "class-validator";

export class EditDosenDto{
    @IsString()
    @IsOptional()
    username: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    nip: string;

    @IsString()
    @IsOptional()
    name: string;
}