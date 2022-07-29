import { IsOptional, IsString } from "class-validator";

export class EditTapelDto{
    @IsString()
    @IsOptional()
    tahun_pelajaran: string;
}