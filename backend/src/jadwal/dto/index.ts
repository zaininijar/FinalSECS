import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateJurusanDto{
    @IsInt()
    @IsNotEmpty()
    dosen_id: number;

    @IsInt()
    @IsNotEmpty()
    matakuliah_id: number;

    @IsInt()
    @IsNotEmpty()
    kelas_id: number;

    @IsInt()
    @IsNotEmpty()
    tapel_id: number;

    @IsString()
    @IsNotEmpty()
    hari: String;
}