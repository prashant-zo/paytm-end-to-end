# Paytm Clone

👉 [Watch the demo on Google Drive](https://drive.google.com/file/d/1HJi3gCKMjaoTgqKEnRtrPF1DbQx0ICbP/view?usp=drive_link)

A full-stack Paytm-like application built using MERN (MongoDB, Express.js, React, Node.js).

## Features
- User Authentication (Signup/Login)
- Wallet Recharge & Transactions
- Random Balance Generation (No Bank Integration)
- Payment Gateway Integration
- Transaction History
- Secure API with JWT Authentication
- Docker for local MongoDB setup

## Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **State Management:** Recoil (if used)
- **Real-time Updates:** Socket.IO (if applicable)

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/your-username/paytm-clone.git
cd paytm-clone
```

### 2. Install Dependencies
#### For Backend
```sh
cd backend
npm install
```
#### For Frontend
```sh
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PAYMENT_GATEWAY_KEY=your_payment_gateway_key
```

### 4. Run the Application
#### Start Backend Server
```sh
cd backend
npm start
```
#### Start Frontend
```sh
cd frontend
npm start
```

The application will be available at `http://localhost:3000`.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push the changes:
   ```sh
   git push origin feature-branch
   ```
5. Open a Pull Request on GitHub.

## License
This project is licensed under the MIT License.

