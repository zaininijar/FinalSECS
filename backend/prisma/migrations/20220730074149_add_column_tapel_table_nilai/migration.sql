/*
  Warnings:

  - Added the required column `tapel_id` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nilai" ADD COLUMN     "tapel_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_tapel_id_fkey" FOREIGN KEY ("tapel_id") REFERENCES "TahunPelajaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
