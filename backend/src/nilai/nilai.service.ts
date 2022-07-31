import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getNilaiByMatkulId(userStatus: string, userId: number, matkulId: number, tapel: number){
        this.verifyDosen(userStatus)

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const tahunPelajaran = await this.prisma.tahunPelajaran.findFirst({
            where: {
                id: tapel
            }
        })

        const mapelDosen = await this.prisma.jadwal.findFirst({
            where: {
                dosen_id: dosen.id,
                matkul_id: matkulId,
                tapel_id: tahunPelajaran.id
            }
        })

        if(!mapelDosen){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Melihat Nilai Ini!'
            )
        }

        const nilai = await this.prisma.nilai.findMany({
            where: {
                matkul_id: matkulId,
                tapel_id: tahunPelajaran.id
            },
            include: {
                mahasiswa: {
                    include: {
                        kelas: true
                    }
                },
                matkul: true,
                tapel: true
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
                matkul: true
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
                matkul: true,
                tapel: true
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

        const mapelDosen = await this.prisma.jadwal.findFirst({
            where: {
                dosen_id: dosen.id,
                matkul_id: nilai.matkul_id,
                tapel_id: nilai.tapel_id
            }
        })

        if(!mapelDosen){
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

    async createNilai(userStatus: string, userId: number, dto: CreateNilaiDto){

        this.verifyDosen(userStatus)

        const dosen = await this.prisma.dosen.findFirst({
            where: {
                user_id: userId
            }
        })

        const matkulDosen = await this.prisma.jadwal.findFirst({
            where: {
                matkul_id: dto.matkul_id,
                dosen_id: dosen.id,
                tapel_id: dto.tapel_id
            }
        })

        if(!matkulDosen){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Menginput Nilai Ini!'
            )
        }

        const mahasiswa = await this.prisma.mahasiswa.findUnique({
            where: {
                id: dto.mahasiswa_id
            }
        })

        if(matkulDosen.kelas_id !== mahasiswa.kelas_id){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Menginput Nilai Mahasiswa diKelas lain!'
            )
        }

        const matkul = await this.prisma.matakuliah.findFirst({
            where: {
                id: dto.matkul_id
            }
        })

        if(!matkul.semester){
            const matkulMahasiswa = await this.prisma.matakuliahMahasiswa.findFirst({
                where: {
                    mahasiswa_id: dto.mahasiswa_id,
                    matkul_id: dto.matkul_id
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

        const mapelDosen = await this.prisma.jadwal.findFirst({
            where: {
                dosen_id: dosen.id,
                matkul_id: nilai.matkul_id,
                tapel_id: nilai.tapel_id
            }
        })

        if(!mapelDosen){
            throw new ForbiddenException(
                'Anda tidak memiliki Hak untuk Merubah Nilai Ini!'
            )
        }

        const editNilai = await this.prisma.nilai.update({
            where: {
                id: nilaiId
            },
            data: {
                ...dto
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

        const mapelDosen = await this.prisma.jadwal.findFirst({
            where: {
                dosen_id: dosen.id,
                matkul_id: nilai.matkul_id,
                tapel_id: nilai.tapel_id
            }
        })

        if(!mapelDosen){
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
                matkul: true
            }
        })


        let dataBobot = [];
        let dataSKS = [];
        let jmlSKS = 0;
        let totalPoint = 0;

        nilai.forEach(nilai => dataBobot.push(nilai.bobot))
        nilai.forEach(sks => dataSKS.push(sks.matkul.sks))

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
