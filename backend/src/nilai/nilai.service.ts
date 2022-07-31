import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNilaiDto, EditNilaiDto } from './dto';

@Injectable()
export class NilaiService {
    constructor(private prisma: PrismaService){}

    verifyAdmin(status){
        if(status !== 'admin'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    verifyDosen(status){
        if(status !== 'dosen'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    verifyMahasiswa(status){
        if(status !== 'mahasiswa'){
            throw new ForbiddenException(
                'Anda tidak memiliki akses untuk request ini!'
            )
        }
    }

    async getNilaiByJadwalId(userStatus: string, userId: number, jadwalId: number){
        this.verifyDosen(userStatus)

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: jadwalId
            }
        })

        if(!jadwal){
            throw new NotFoundException(
                'Jadwal Tidak Ditemukan'
            )
        }

        if(dosen.id !== jadwal.dosen_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Melihat Nilai Ini!'
            )
        }

        const nilai = await this.prisma.nilai.findMany({
            where: {
                jadwal_id: jadwalId
            },
            include: {
                mahasiswa: {
                    include: {
                        kelas: true
                    }
                },
                jadwal: {
                    select: {
                        matkul: true
                    }
                }
            } 
        })

        return {
            status: 'success',
            message: 'Data Nilai Berhasil Ditampilkan',
            data: nilai
        }
    }

    async getNilaiByNim(userStatus: string, nimMahasiswa: string){
        this.verifyAdmin(userStatus)

        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                nim: nimMahasiswa
            }
        })

        const nilai = await this.prisma.nilai.findMany({
            where: {
                mahasiswa_id: mahasiswa.id
            },
            include: {
                jadwal: {
                    select: {
                        matkul: true
                    }
                }
            }
        })

        return {
            status: 'success',
            message: `Data Nilai Mahasiswa dengan NIM : ${nimMahasiswa} Berhasil Ditampilkan`,
            data: nilai
        }
    }

    async getNilaiMe(userStatus: string, userId: number){
        this.verifyMahasiswa(userStatus)

        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                user_id: userId
            }
        })

        const nilai = await this.prisma.nilai.findMany({
            where: {
                mahasiswa_id: mahasiswa.id
            },
            include: {
                jadwal: {
                    select: {
                        matkul: true
                    }
                }
            }
        })

        return {
            status: 'success',
            message: `Data Nilai Anda Berhasil Ditampilkan`,
            data: nilai
        }
    }

    async getNilaiById(userStatus: string, userId: number, nilaiId: number){

        this.verifyDosen(userStatus)

        const nilai = await this.prisma.nilai.findFirst({
            where: {
                id: nilaiId
            }
        })

        if(!nilai){
            throw new NotFoundException(
                'Data Nilai Tidak Ditemukan'
            )
        }

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: nilai.jadwal_id
            }
        })

        if(dosen.id !== jadwal.dosen_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Melihat Nilai Ini!'
            )
        }

        return {
            status: 'success',
            message: `Data Nilai dengan ID : ${nilaiId} Berhasil Ditampilkan`,
            data: nilai
        }
    }

    // async getMahasiswa(userStatus: string, userId: number, )

    async createNilai(userStatus: string, userId: number, dto: CreateNilaiDto){

        this.verifyDosen(userStatus)

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: dto.jadwal_id
            }
        })

        if(dosen.id !== jadwal.dosen_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Menginput Nilai Ini!'
            )
        }

        const mahasiswa = await this.prisma.mahasiswa.findUnique({
            where: {
                id: dto.mahasiswa_id
            }
        })

        if(jadwal.kelas_id !== mahasiswa.kelas_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Menginput Nilai Mahasiswa diKelas lain!'
            )
        }

        const matkul = await this.prisma.matakuliah.findFirst({
            where: {
                id: jadwal.matkul_id
            }
        })

        if(!matkul.semester){
            const matkulMahasiswa = await this.prisma.matakuliahMahasiswa.findFirst({
                where: {
                    mahasiswa_id: dto.mahasiswa_id,
                    matkul_id: jadwal.matkul_id
                }
            })

            if(!matkulMahasiswa){
                throw new ForbiddenException(
                    'Mahasiswa ini tidak ada memilih matakuliah tersebut!'
                )
            }
        }

        let bobot;

        if(dto.nilai === "A"){
            bobot = 4
        }else if(dto.nilai === "B"){
            bobot = 3
        }else if(dto.nilai === "C"){
            bobot = 2
        }else if(dto.nilai === "D"){
            bobot = 1
        }else{
            bobot = 0
        }

        const checkNilai = await this.prisma.nilai.findFirst({
            where: {
                mahasiswa_id: dto.mahasiswa_id,
                jadwal_id: dto.jadwal_id
            }
        })

        if(checkNilai){
            throw new BadRequestException(
                'Nilai Sudah Ada'
            )
        }

        const nilai = await this.prisma.nilai.create({
            data:{
                ...dto,
                bobot
            }
        });

        // this.updateIPS(dto.mahasiswa_id)

        return {
            status: 'success',
            message: 'nilai Berhasil Diinputkan',
            data: nilai
        }
  
    }

    async editNilaiById(userStatus: string, userId: number, nilaiId: number, dto: EditNilaiDto){

        this.verifyDosen(userStatus)

        const nilai = await this.prisma.nilai.findUnique({
            where: {
                id: nilaiId
            }
        })

        if(!nilai){
            throw new NotFoundException(
                'Data Nilai Tidak Ditemukan'
            )
        }

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: nilai.jadwal_id
            }
        })

        if(dosen.id !== jadwal.dosen_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Merubah Nilai Ini!'
            )
        }

        let bobot;

        if(dto.nilai === "A"){
            bobot = 4
        }else if(dto.nilai === "B"){
            bobot = 3
        }else if(dto.nilai === "C"){
            bobot = 2
        }else if(dto.nilai === "D"){
            bobot = 1
        }else{
            bobot = 0
        }

        const editNilai = await this.prisma.nilai.update({
            where: {
                id: nilaiId
            },
            data: {
                ...dto,
                bobot
            }
        })

        return {
            status: 'success',
            message: 'Data Nilai Berhasil Diedit',
            data: editNilai
        }
    }

    async deleteNilaiById(userStatus: string, userId: number, nilaiId: number){
        this.verifyDosen(userStatus)

        const nilai = await this.prisma.nilai.findUnique({
            where: {
                id: nilaiId
            }
        })

        if(!nilai){
            throw new NotFoundException(
                'Data Nilai Tidak Ditemukan'
            )
        }

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const jadwal = await this.prisma.jadwal.findUnique({
            where: {
                id: nilai.jadwal_id
            }
        })

        if(dosen.id !== jadwal.dosen_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Menghapus Nilai Ini!'
            )
        }
        
        await this.prisma.nilai.delete({
            where: {
                id: nilaiId
            }
        })

        return {
            status: 'success',
            message: 'Data Nilai Berhasil Dihapus',
        }
    }

    async getIPK(userStatus: string, userId: number){

        this.verifyMahasiswa(userStatus)

        const mahasiswa = await this.prisma.mahasiswa.findFirst({
            where: {
                user_id: userId,
            }
        })

        const nilai = await this.prisma.nilai.findMany({
            where: {
                mahasiswa_id: mahasiswa.id,
            },
            include: {
                jadwal: {
                    include: {
                        matkul: true
                    }
                }
            }
        })


        let dataBobot = [];
        let dataSKS = [];
        let jmlSKS = 0;
        let totalPoint = 0;

        nilai.forEach(nilai => dataBobot.push(nilai.bobot))
        nilai.forEach(sks => dataSKS.push(sks.jadwal.matkul.sks))

        for(let i = 0; i < dataBobot.length; i++ ){
            jmlSKS += dataSKS[i];
            totalPoint += dataBobot[i] * dataSKS[i]
        }

        let IPK = totalPoint / jmlSKS

        return {
            status: 'success',
            message: `IPK Anda Berhasil Ditampilkan`,
            data: {
                jumlah_sks: jmlSKS,
                IPK
            }
        }
        
    }
}
