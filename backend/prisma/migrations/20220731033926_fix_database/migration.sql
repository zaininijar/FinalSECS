/*
  Warnings:

  - The `semester` column on the `Matakuliah` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `semester` on the `MatakuliahMahasiswa` table. All the data in the column will be lost.
  - You are about to drop the `RekapNilai` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matkulPilihan` to the `Matakuliah` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sks` on the `Matakuliah` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "RekapNilai" DROP CONSTRAINT "RekapNilai_mahasiswa_id_fkey";

-- AlterTable
ALTER TABLE "Matakuliah" ADD COLUMN     "matkulPilihan" BOOLEAN NOT NULL,
DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER,
DROP COLUMN "sks",
ADD COLUMN     "sks" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MatakuliahMahasiswa" DROP COLUMN "semester";

-- AlterTable
ALTER TABLE "Nilai" ADD COLUMN     "bobot" INTEGER;

-- DropTable
DROP TABLE "RekapNilai";
