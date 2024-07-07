```markdown
# API Documentation

## Authentication

### Admin Signup
**Endpoint:** `POST https://secs-api.kamari.web.id/auth/signup`  
**Content-Type:** `application/json`

**Request Body:**
```json
{
    "username": "admin",
    "password": "secret123"
}
```

---

### Signin
**Endpoint:** `POST http://localhost:3000/auth/signin`  
**Content-Type:** `application/json`

**Request Body:**
```json
{
    "username": "admin",
    "password": "secret123"
}
```

---

## User

### Get User Profile
**Endpoint:** `GET http://localhost:3000/users/me`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

---

## Dosen

### Create Dosen
**Endpoint:** `POST http://localhost:3000/dosen`  
**Content-Type:** `application/json`  
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
    "username": "NVXz4Aro7A",
    "password": "secret123",
    "nip": "4334357844066304",
    "name": "Donald Wade"
}
```

**Alternative Request Body:**
```json
{
    "username": "JiJB20qAzG",
    "password": "secret123",
    "nip": "8426779188396032",
    "name": "Eula Ellis"
}
```

---

### Get Dosen
**Endpoint:** `GET http://localhost:3000/dosen`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

---

## Mahasiswa

### Create Mahasiswa
**Endpoint:** `POST http://localhost:3000/mahasiswa`  
**Content-Type:** `application/json`  
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
    "username": "TEST",
    "password": "TEST",
    "nim": "3242",
    "name": "Hallie Bla3ck",
    "kelas_id": 1
}
```

**Alternative Request Body:**
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

---

### Get Mahasiswa
**Endpoint:** `GET http://localhost:3000/mahasiswa`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

---

### Delete Mahasiswa
**Endpoint:** `DELETE http://localhost:3000/mahasiswa/1`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

---

### Update Mahasiswa Password
**Endpoint:** `PUT http://localhost:3000/mahasiswa/9`  
**Content-Type:** `application/json`  
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
    "password": "test"
}
```

---

## Jurusan

### Create Jurusan
**Endpoint:** `POST http://localhost:3000/jurusan`  
**Content-Type:** `application/json`  
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
    "nama_jurusan": "Desain Komunikasi Visual(DKV)"
}
```

**Alternative Request Body:**
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

---

### Get Jurusan
**Endpoint:** `GET http://localhost:3000/jurusan`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
Content-Type: application/json
```

---

## Kelas

### Get Kelas
**Endpoint:** `GET http://localhost:3000/kelas`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
Content-Type: application/json
```

---

### Update Kelas
**Endpoint:** `PUT http://localhost:3000/kelas/14`  
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
    "nama_kelas": "testupdate",
    "jurusan_id": 1
}
```

---

## Matakuliah

### Get Matakuliah
**Endpoint:** `GET http://localhost:3000/matakuliah/1`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

### Get Matakuliah Mahasiswa
**Endpoint:** `GET http://localhost:3000/matakuliah-mahasiswa`  
**Authorization:** `Bearer <token>`

**Headers:**
```plaintext
Authorization: Bearer <token>
```

### Create Matakuliah Mahasiswa
**Endpoint:** `POST http://localhost:3000/matakuliah-mahasiswa`  
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
    "mahasiswa_id": 1,
    "matkul_id": 1
}
```

---

## Nilai

### Create Nilai
**Endpoint:** `POST http://localhost:3000/nilai`  
**Authorization:** `Bearer <token>`

**Request Body:**
```json
{
    "mahasiswa_id": 1,
    "jadwal_id": 1,
    "nilai": 90
}
```
```
