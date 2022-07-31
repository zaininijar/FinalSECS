import { IsInt, IsNotEmpty } from "class-validator";

export class CreateMatkulMeDto{
    @IsInt()
    @IsNotEmpty()
    matkul_id: number;
}