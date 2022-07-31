/*
  Warnings:

  - You are about to drop the column `matkul_id` on the `Nilai` table. All the data in the column will be lost.
  - You are about to drop the column `tapel_id` on the `Nilai` table. All the data in the column will be lost.
  - Added the required column `jadwal_id` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_matkul_id_fkey";

-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_tapel_id_fkey";

-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "matkul_id",
DROP COLUMN "tapel_id",
ADD COLUMN     "jadwal_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
