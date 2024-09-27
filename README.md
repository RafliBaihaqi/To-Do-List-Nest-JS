# To Do List Web Application 

## Project Pattern

### Backend

Backend pada proyek ini menggunakan pola Model-Routes-Controller:

1. **Models**: Berisi definisi skema dan model untuk database.
2. **Views**: Mengelola endpoint API yang berinteraksi dengan model dan menangani logika aplikasi.
3. **Controllers**: Mengatur aliran data antara model dan view, menangani logika aplikasi dan memastikan data yang tepat dikirim ke View.

### Frontend

Frontend pada proyek ini menggunakan pola Komponen-Halaman dan API Client:

1. **Components**: Berisi komponen UI yang dapat digunakan kembali di berbagai halaman.
2. **Pages**: Berisi halaman yang menggabungkan beberapa komponen dan mengatur tata letak serta interaksi dengan pengguna.
3. **API Client**: Mengelola interaksi dengan backend API untuk mengambil atau mengirim data, menangani autentikasi, dan operasi CRUD lainnya.

## Alasan Pemilihan Pattern

1. **Separation of Concerns**: Pemisahan antara Model, View, dan Controller memudahkan pengelolaan kode dan memungkinkan tim yang berbeda untuk bekerja pada bagian yang berbeda dari aplikasi secara paralel.
2. **Scalability**: Memungkinkan pengembangan frontend dan backend secara independen, sehingga lebih mudah untuk menambah fitur baru tanpa mengganggu bagian lain dari aplikasi.
3. **Maintainability**: Dengan pemisahan yang jelas antara komponen UI dan logika bisnis, memudahkan untuk menemukan dan memperbaiki bug, serta melakukan refactoring kode.

## API Documentation
https://documenter.getpostman.com/view/27313392/2sA3rwNEcm

# Installation 

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version `X.X.X` or higher
- **npm** or **yarn**
- **SQL Database** (e.g., MySQL, PostgreSQL)
- **Cloudinary** Account for image management

---

## Setting Up Cloudinary

1. Go to the [Cloudinary website](https://cloudinary.com/) and create an account.
2. Once logged in, navigate to the **Dashboard**.
3. Find your **Cloud Name**, **API Key**, and **API Secret**.
4. You will use these values to configure your environment variables in the next steps.

---

## Setting Up SQL

1. Install the preferred SQL database on your machine (e.g., MySQL or PostgreSQL).
2. Create a new database using your SQL client of choice with the ERD and the SQL Dump can be found in the link below:
   https://drive.google.com/drive/folders/1cW3hruHsSGkXluVHiYVWqEq7scKOmjPV?usp=sharing

## Setting Up env file
1. Create env in the backend folder and fill it with
```
DATABASE_HOST = your_database_host
DATABASE_PORT = your_db_port
DATABASE_NAME = your_database_name
DATABASE_USER = your_database_user
DATABASE_PASS = your_database_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_API_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

JWT = your_jwt_secret_key

FRONTEND_URL=your_frontend_url
```

2. Create env in the frontend folder and fill it with
```
VITE_API_BASE_URL=your_backend_url
```

### Installation and Running
## Backend

```
cd backend
npm install
npm run dev
```
## Frontend

```
cd frontend
npm install
npm run dev
```
