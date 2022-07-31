import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateJadwalDto{
    @IsInt()
    @IsNotEmpty()
    dosen_id: number;

    @IsInt()
    @IsNotEmpty()
    matkul_id: number;

    @IsInt()
    @IsNotEmpty()
    kelas_id: number;

    @IsInt()
    @IsNotEmpty()
    tapel_id: number;

    @IsString()
    @IsNotEmpty()
    hari: string;

    @IsString()
    @IsNotEmpty()
    jam_mulai: string;

    @IsString()
    @IsNotEmpty()
    jam_selesai: string;
    
}