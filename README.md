
# `Chatbot AI Interview Assistant`

**Description**  
Proyek ini adalah sebuah Chatbot AI yang dirancang untuk melakukan sesi wawancara (interview) dengan pengguna. Setelah wawancara selesai, AI akan secara otomatis memproses dan mengirimkan hasil wawancara ke email pengguna. Proyek ini menggunakan Google OAuth 2.0 untuk otentikasi dan pengiriman email, serta Function Calling yang divalidasi oleh Zod untuk memastikan data yang dikirimkan akurat.
---

## 🧑‍💻 Team


| **Name**                    | **Role**       |
|-----------------------------|----------------|
| Rafly Zulfikar AlKautsar    | Role 1         |
| Rayya Syauqi Alulu'i        | Role 2         |
| Zidane Surya Nugraha        | Role 3         |
| Ukasyah                     | Role 4         |


---

## 🚀 Features
- **🤖 AI Interview Simulation**: Pengguna dapat berinteraksi dengan AI yang akan mensimulasikan sesi wawancara.
- **📧 Automated Email Reporting**: AI dapat mengirimkan hasil wawancara langsung ke email pengguna.
- **⚙️ Function Calling**: AI memanggil fungsi sendEmail untuk mengirimkan laporan.
- **✅ Zod Validation**: Panggilan fungsi sendEmail divalidasi menggunakan Zod untuk memastikan data email (format email, dll.) sudah benar sebelum dieksekusi.
- **🔐 Secure Email Sending with Google OAuth 2.0**: Menggunakan token dari Google OAuth 2.0 untuk otentikasi yang aman saat mengirim email melalui Gmail API.


## 🛠 Tech Stack

**Frontend:**
- Next.js
- Tailwind CSS
- Shadcn UI

**Backend:**
- Next.js

---

## 🚀 How to Run the Project
note: dont forget to create .env.local with your Gemini API Key in the folder

### Step 1. Clone the Repository
```bash
git clone https://github.com/Rayya12/Team7-Webinar1.git
cd Team7-Webinar1
```

### Step 2. Instal Dependensi
```bash
npm install
npm i zod googleapis (jika perlu)
```

### Step 3 Konfigurasi .env.local (dapatkan dari google cloud)
```bash
GOOGLE_API_KEY=...
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REDIRECT_URI=http://localhost:3000/api/chat/google/oauth/callback
GMAIL_SENDER=...

# Jangan di-commit ke Git! 
GMAIL_ACCESS_TOKEN=...
GMAIL_REFRESH_TOKEN=...
```

### Step 4 Jalankan Server
```bash
npm run dev
```

### Step 5. Authorize Google Account
```bash
http://localhost:3000/api/chat/google/oauth/start
isi GMAIL_ACCESS_TOKEN dan GMAIL_REFRESH_TOKEN dari token yang ada di console anda!
```

## 📋 Requirements (optional)
- Node.js versi 18.18
- Gemini API
- Gmail API


