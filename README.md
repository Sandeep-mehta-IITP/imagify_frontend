<h1 align="center">
  <img src="https://raw.githubusercontent.com/Sandeep-mehta-IITP/imagify_frontend/main/public/favicon.svg" width="30" />
  Imagify
</h1>

<p align="center">
  <b>AI-Powered Image Generator</b> • <i>Built with MERN Stack</i>  
</p>

<p align="center">
  <a href="https://imagify-frontend-qope.onrender.com" target="_blank"><strong>🌐 Live Demo</strong></a> |
  <strong>Solo Project</strong> • <strong>Responsive Design</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-informational" />
  <img src="https://img.shields.io/badge/Payments-Razorpay-blue" />
  <img src="https://img.shields.io/badge/Status-Demo%20Mode-yellow" />
  <img src="https://img.shields.io/badge/Made%20By-Sandeep%20Mehta-success" />
</p>

---

## ✨ Overview

**Imagify** is a full-stack web application where users can generate AI-based images by providing custom prompts. It features secure authentication, credit-based usage, Razorpay integration for purchasing credits, and a clean responsive UI.

---

🔗 **Live Website:** [imagify-frontend-qope.onrender.com](https://imagify-frontend-qope.onrender.com)

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure **user registration & login**
- **Password reset via OTP** sent to the user's registered email
- Email is validated against database before proceeding
- OTP-based verification must be completed before password update

### 🧠 AI Image Generation
- Generate AI images from **custom text prompts**
- Responsive and intuitive image preview
- Built using AI image generation API (e.g., OpenAI or similar)

### 💳 Credit System
- Each user gets **5 free credits** by default
- **1 credit** is consumed per image generation
- If credits are exhausted, user receives a **"Low credits"** message
- Users can **purchase more credits via Razorpay** (Demo Mode Enabled)

### 🛡️ Backend
- Built with **Express.js & MongoDB**
- Email-based OTP system for secure password reset
- Stores OTP and expiry directly in the user model
- Validations, error handling, and modular structure

### 🎨 Frontend
- Built using **React** with **Tailwind CSS**
- Fully **responsive** UI across all devices
- Modern modal-based flows for login and password reset
- Context-based global state management

---

## 📸 Screenshots

### 🏠 Homepage
![Homepage](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654098/Screenshot_2025-04-26_111855_uweak8.png)

### 🔐 Login Page
![Login Page](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654437/Screenshot_2025-04-26_133022_ezzbcw.png)

### 🖼️ Generated Image
![Generated Image](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654002/Screenshot_2025-04-26_131449_dpftcj.png)

### 🧠 Image Generation Page
![Image Generation Page](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654001/Screenshot_2025-04-26_111925_szs9fw.png)

### 💳 Payment Page
![Payment Page](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654001/Screenshot_2025-04-26_131603_cfl9r0.png)

### 🎉 Payment Successful Page
![Payment Successful](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654000/Screenshot_2025-04-26_131642_tpo6bc.png)

### 🔑 Forgot Password
![Forgot Password](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654000/Screenshot_2025-04-26_131718_eaew4b.png)

### 🔐 OTP Receive
![OTP Receive](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654000/Screenshot_2025-04-26_131811_m5fucq.png)

### 📦 Plan Page
![Plan Page](https://res.cloudinary.com/sandeepmehta/image/upload/v1745654000/Screenshot_2025-04-26_131502_ifjr9a.png)

## 🧪 Demo Payment Instructions

You can easily test the **payment flow** without using any real card or mobile number. Follow these simple steps:

---

### 1️⃣ Fill Dummy Mobile Number
- Enter this **test mobile number**:  
  **`8635426155`**

---

### 2️⃣ Skip OTP Verification
- Click on "**Skip OTP**" option when prompted.
- If needed, **enter any random 6-digit OTP**, for example:  
  **`123456`** or **`654321`**

---

### 3️⃣ Enter Test Card Details
Use the following dummy card details provided by Razorpay for testing:

| Field              | Value                          |
|--------------------|--------------------------------|
| **Card Number**    | `4386 2894 0766 0153`           |
| **Expiry Date**    | `12/27`                        |
| **CVV**            | `123`                          |
| **Cardholder Name** | (You can write any name)       |

---

> ⚡ **Note:**  
> - This is a **Demo Mode** payment.  
> - **No real transaction** will happen.  
> - Feel free to experiment safely.

---

✅ Now you are ready to **successfully simulate a payment** and experience the full flow of Imagify!


## 🧰 Tech Stack

| Technology      | Description                      |
|----------------|----------------------------------|
| React + Tailwind | Frontend                        |
| Node.js + Express | Backend API                    |
| MongoDB         | NoSQL Database                  |
| JWT + OTP       | Authentication & Password Reset |
| Razorpay        | Payment Gateway (Demo Mode)     |

---

## 📂 Folder Structure

```bash
imagify/
├── client/          # React frontend
│   ├── components/
│   ├── context/
│   └── pages/
├── server/          # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
