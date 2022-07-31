import { IsInt, IsOptional, IsString } from "class-validator";

export class EditJadwalDto{
    @IsInt()
    @IsOptional()
    dosen_id: number;

    @IsInt()
    @IsOptional()
    matkul_id: number;

    @IsInt()
    @IsOptional()
    kelas_id: number;

    @IsInt()
    @IsOptional()
    tapel_id: number;

    @IsString()
    @IsOptional()
    hari: string;

    @IsString()
    @IsOptional()
    jam_mulai: string;

    @IsString()
    @IsOptional()
    jam_selesai: string;
    
}