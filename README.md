# Bitcoin Address Explorer 

A sleek and efficient tool for exploring Bitcoin addresses and their transactions.

## Core Features

### 🔍 Address Inspector
- Real-time BTC balance checking
- Transaction history viewer
- Bitcoin address validation

### 💱 Currency Converter
- Live BTC to USD conversion
- Clean and intuitive interface

### 📲 QR Code Generator
- Instant Bitcoin address QR code generation
- High-quality PNG download option

## Technical Stack

### ⚙️ Frontend
- React 18 with Vite
- TailwindCSS for styling
- Modern, responsive UI
- Axios for API requests

### ⚡ Backend
- Node.js/Express server
- RESTful API architecture
- Bitcoin address validation
- Rate limiting protection

### 🔒 Security Features
- Input validation and sanitization
- Rate limiting safeguards
- API request validation

## Quick Start
```bash
git clone https://github.com/yourusername/bitcoin-address-explorer.git
cd bitcoin-address-explorer
# Install dependencies for both client and server
npm install
cd client && npm install
# Start the application
docker-compose up --build