import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class EditNilaiDto{
    @IsString()
    @IsNotEmpty()
    nilai: string;
}