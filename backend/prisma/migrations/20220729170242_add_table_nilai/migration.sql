/*
  Warnings:

  - Changed the type of `jam_mulai` on the `Jadwal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `jam_selesai` on the `Jadwal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "jam_mulai",
ADD COLUMN     "jam_mulai" TIME(3) NOT NULL,
DROP COLUMN "jam_selesai",
ADD COLUMN     "jam_selesai" TIME(3) NOT NULL;

-- CreateTable
CREATE TABLE "Nilai" (
    "id" SERIAL NOT NULL,
    "mahasiswa_id" INTEGER NOT NULL,
    "matkul_id" INTEGER NOT NULL,
    "nilai" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RekapNilai" (
    "id" SERIAL NOT NULL,
    "mahasiswa_id" INTEGER NOT NULL,
    "ip_smt1" DECIMAL(65,30) NOT NULL,
    "ip_smt2" DECIMAL(65,30) NOT NULL,
    "ip_smt3" DECIMAL(65,30) NOT NULL,
    "ip_smt4" DECIMAL(65,30) NOT NULL,
    "ip_smt5" DECIMAL(65,30) NOT NULL,
    "ip_smt6" DECIMAL(65,30) NOT NULL,
    "ip_smt7" DECIMAL(65,30) NOT NULL,
    "ip_smt8" DECIMAL(65,30) NOT NULL,
    "ipk" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RekapNilai_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_matkul_id_fkey" FOREIGN KEY ("matkul_id") REFERENCES "Matakuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RekapNilai" ADD CONSTRAINT "RekapNilai_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
