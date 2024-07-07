```markdown
### Admin Signup
**POST** `https://secs-api.kamari.web.id/auth/signup`  
Content-Type: application/json

```json
{
    "username": "admin",
    "password": "secret123"
}
```

### Signin
**POST** `http://localhost:3000/auth/signin`  
Content-Type: application/json

```json
{
    "username": "admin",
    "password": "secret123"
}
```

### User Profile
**GET** `http://localhost:3000/users/me`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8`

### Create Dosen
**POST** `http://localhost:3000/dosen`  
Content-Type: application/json  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8`

```json
{
    "username": "NVXz4Aro7A",
    "password": "secret123",
    "nip": "4334357844066304",
    "name": "Donald Wade"
}
```

```json
{
    "username": "JiJB20qAzG",
    "password": "secret123",
    "nip": "8426779188396032",
    "name": "Eula Ellis"
}
```

### Get Dosen
**GET** `http://localhost:3000/dosen`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8`

### Create Mahasiswa
**POST** `http://localhost:3000/mahasiswa`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkxNTE0MDQsImV4cCI6MTY1OTIzNzgwNH0.yE7IpVFv00SI8BQt7d7gRJOuDyfFl2b3VuGTLdlKoow`  
Content-Type: application/json

```json
{
    "username": "TEST",
    "password": "TEST",
    "nim": "3242",
    "name": "Hallie Bla3ck",
    "kelas_id": 1
}
```

```json
{
    "username": "rbkxlznqdu",
    "password": "secret123",
    "nim": "3447703310696448",
    "name": "Mae Fitzgerald",
    "kelas_id": 1
}
```

```json
{
    "username": "IrPNV8EXYw",
    "password": "secret123",
    "nim": "7298859673845760",
    "name": "Jonathan Garza",
    "kelas_id": 1
}
```

```json
{
    "username": "6nepjpGV79",
    "password": "secret123",
    "nim": "5231625984016384",
    "name": "John Johnson",
    "kelas_id": 2
}
```

### Get Mahasiswa
**GET** `http://localhost:3000/mahasiswa`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTk0MTEyNDAsImV4cCI6MTY1OTQ5NzY0MH0.pILINdpYnHyPfx6rkx-5rsi1jYeTEq1kXCfq9FiAVdQ`

### Delete Mahasiswa
**DELETE** `http://localhost:3000/mahasiswa/1`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTg5NzQ1NjIsImV4cCI6MTY1OTA2MDk2Mn0.SDprG2ohfRbWNg8PyrKIn7rgrMsX4AAGEmBkePo0tAc`

### Create Jurusan
**POST** `http://localhost:3000/jurusan`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkxNTE0MDQsImV4cCI6MTY1OTIzNzgwNH0.yE7IpVFv00SI8BQt7d7gRJOuDyfFl2b3VuGTLdlKoow`  
Content-Type: application/json

```json
{
    "nama_jurusan": "Desain Komunikasi Visual(DKV)"
}
```

```json
{
    "nama_jurusan": "Teknik Informatika(TI)"
}
```

```json
{
    "nama_jurusan": "Sistem Informasi(SI)"
}
```

```json
{
    "nama_jurusan": "Teknik Elektro(TE)"
}
```

### Get Jurusan
**GET** `http://localhost:3000/jurusan`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8`  
Content-Type: application/json

### Get Kelas
**GET** `http://localhost:3000/kelas`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTkwNjY5ODUsImV4cCI6MTY1OTE1MzM4NX0.tQwWjd0wq1Z7Ob_Rbpn4lRfWlGZTr9adqW5rK8ECkn8`  
Content-Type: application/json

### Update Mahasiswa Password
**PUT** `http://localhost:3000/mahasiswa/9`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTg5NzQ1NjIsImV4cCI6MTY1OTA2MDk2Mn0.SDprG2ohfRbWNg8PyrKIn7rgrMsX4AAGEmBkePo0tAc`  
Content-Type: application/json

```json
{
    "password": "test"
}
```

### Update Kelas
**PUT** `http://localhost:3000/kelas/14`  
Authorization: Bearer `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NTg5NzQ1NjIsImV4cCI6MTY1OTA2MDk2Mn0.SDprG2ohfRbWNg8PyrKIn7rgrMsX4AAGEmBke
