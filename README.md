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

- **Node.js** version `20.15` or higher
- **npm** 
- MongoDB Database

---

## Setting Up MongoDB

1. Set up mongoDB project 
2. Connect your mongodb cluster to the application using the connection link provided by mongoDB and paste it in .env.example in the root folder

## Setting Up env file
1. Fill all the required field in the .env.example in the root folder for backend
```
MONGODB_URI = your_mongodb_connection_link
JWT_SECRET_KEY = your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

2. Use the .env.example file in the client folder for frontend
```
VITE_API_BASE_URL=http://localhost:3000
```

### Installation and Running
## Backend

```
npm install
cd src
npm run start:dev
```
## Frontend

```
cd client
npm install
npm run dev
```
