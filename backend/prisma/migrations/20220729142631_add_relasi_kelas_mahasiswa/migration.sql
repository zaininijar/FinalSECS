-- AddForeignKey
ALTER TABLE "Mahasiswa" ADD CONSTRAINT "Mahasiswa_kelas_id_fkey" FOREIGN KEY ("kelas_id") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
