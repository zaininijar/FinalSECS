### admin signup
POST https://secs-api.kamari.web.id/auth/signup
content-type: application/json

{
    "username": "admin",
    "password": "secret123"
}

### signin
POST http://localhost:3000/auth/signin
content-type: application/json

{
    "username": "admin",
    "password": "secret123"
}

###user profile
GET http://localhost:3000/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8


###create dosen 
POST http://localhost:3000/dosen
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8

{
    "username": "NVXz4Aro7A",
    "password": "secret123",
    "nip": "4334357844066304",
    "name": "Donald Wade"
}

# {
#     "username": "JiJB20qAzG",
#     "password": "secret123",
#     "nip": "8426779188396032",
#     "name": "Eula Ellis"
# }

###get dosen
GET http://localhost:3000/dosen
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8


###create mahasiswa 
POST http://localhost:3000/mahasiswa
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkxNTE0MDQsImV4cCI6MTY1OTIzNzgwNH0.yE7IpVFv00SI8BQt7d7gRJOuDyfFl2b3VuGTLdlKoow
content-type: application/json

{
    "username": "TEST",
    "password": "TEST",
    "nim": "3242",
    "name": "Hallie Bla3ck",
    "kelas_id": 1
}

# {
#     "username": "rbkxlznqdu",
#     "password": "secret123",
#     "nim": "3447703310696448",
#     "name": "Mae Fitzgerald",
#     "kelas_id": 1
# }

# {
#     "username": "IrPNV8EXYw",
#     "password": "secret123",
#     "nim": "7298859673845760",
#     "name": "Jonathan Garza",
#     "kelas_id": 1
# }

# {
#     "username": "6nepjpGV79",
#     "password": "secret123",
#     "nim": "5231625984016384",
#     "name": "John Johnson",
#     "kelas_id": 2
# }

###get mahasiswa
GET http://localhost:3000/mahasiswa
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTk0MTEyNDAsImV4cCI6MTY1OTQ5NzY0MH0.pILINdpYnHyPfx6rkx-5rsi1jYeTEq1kXCfq9FiAVdQ

###delete mahasiswa
DELETE http://localhost:3000/mahasiswa/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTg5NzQ1NjIsImV4cCI6MTY1OTA2MDk2Mn0.SDprG2ohfRbWNg8PyrKIn7rgrMsX4AAGEmBkePo0tAc

###Jurusan
POST http://localhost:3000/jurusan
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkxNTE0MDQsImV4cCI6MTY1OTIzNzgwNH0.yE7IpVFv00SI8BQt7d7gRJOuDyfFl2b3VuGTLdlKoow
content-type: application/json

# {
#     "nama_jurusan" : "Teknik Informatika(TI)"
# }

# {
#     "nama_jurusan" : "Sistem Informasi(SI)"
# }

# {
#     "nama_jurusan" : "Teknik Elektro(TE)"
# }

{
    "nama_jurusan" : "Desain Komunikasi Visual(DKV)"
}


###Jurusan
GET http://localhost:3000/jurusan
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8
content-type: application/json

###Kelas
GET http://localhost:3000/kelas
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8
content-type: application/json

###mahasiswa update password
PUT http://localhost:3000/mahasiswa/9
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTg5NzQ1NjIsImV4cCI6MTY1OTA2MDk2Mn0.SDprG2ohfRbWNg8PyrKIn7rgrMsX4AAGEmBkePo0tAc
content-type: application/json

{
    "password": "test" 
}

###Kelas Update
PUT http://localhost:3000/kelas/14
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTg5NzQ1NjIsImV4cCI6MTY1OTA2MDk2Mn0.SDprG2ohfRbWNg8PyrKIn7rgrMsX4AAGEmBkePo0tAc

{
    "nama_kelas": "testupdate",
    "jurusan_id": 1
}

###Kelas GET
GET http://localhost:3000/kelas
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTg5NzQ1NjIsImV4cCI6MTY1OTA2MDk2Mn0.SDprG2ohfRbWNg8PyrKIn7rgrMsX4AAGEmBkePo0tAc


###Kelas GET
GET http://localhost:3000/matakuliah-mahasiswa
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkxOTQ5OTQsImV4cCI6MTY1OTI4MTM5NH0.38Fg_c9WEbhBR9vsze_Yp35B5bRuawBrb1e9hWz7NIE


###Matakuliah GET
GET http://localhost:3000/matakuliah/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkyOTAyODAsImV4cCI6MTY1OTM3NjY4MH0.C0yaY5ImlYNwOsmmds9LlY4azRlBaFMIP-u1pMfU9U8


###Matakuliah Mahasiswa POST
POST http://localhost:3000/matakuliah-mahasiswa
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkyOTAyODAsImV4cCI6MTY1OTM3NjY4MH0.C0yaY5ImlYNwOsmmds9LlY4azRlBaFMIP-u1pMfU9U8

{
    "mahasiswa_id": 1,
    "matkul_id": 1,
}

###nilai
POST http://localhost:3000/nilai
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoic2FuZGlrYTIyIiwiaWF0IjoxNjU5NDExMTMzLCJleHAiOjE2NTk0OTc1MzN9.KizT4mS03_HgGV5N13vtV9g-0bOHgC4GsSGeaCACd3E

{
    "mahasiswa_id": 1,
    "jadwal_id": 1,
    "nilai": 90
}
