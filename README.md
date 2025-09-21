# O Sortudo - Irish Gaming Platform Backend API Documentation

## Overview
O Sortudo is an Irish-themed gaming platform inspired by Rillabox, featuring mystery boxes, various games, and a Local Coins system. This document outlines all backend requirements including REST API endpoints, WebSocket events, data models, and real-time features.

## Core System Requirements

### Local Coins System
- **Exchange Rate**: 25 Local Coins = $1 USD
- **Legal Compliance**: Users must receive equivalent Local Coins when spending real money
- **Free Coins**: Users can earn coins through the "Jump Irish Guy" game and daily bonuses

### Real-time Features
- Live drops/wins display
- Real-time game updates
- User activity tracking
- Live player counts

## Authentication & User Management

### REST Endpoints

#### User Registration & Authentication
\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string", 
  "password": "string",
  "dateOfBirth": "YYYY-MM-DD",
  "country": "string"
}

Response: {
  "user": { "id": "string", "username": "string", "email": "string" },
  "token": "jwt_token",
  "welcomeBonus": { "coins": 100, "freeBox": "starter_box_id" }
}
\`\`\`

\`\`\`http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: {
  "user": { "id": "string", "username": "string", "email": "string" },
  "token": "jwt_token"
}
\`\`\`

#### User Profile Management
\`\`\`http
GET /api/user/profile
Authorization: Bearer {token}

Response: {
  "id": "string",
  "username": "string",
  "email": "string",
  "avatar": "string",
  "level": "number",
  "totalWagered": "number",
  "totalWon": "number",
  "winRate": "number",
  "joinDate": "ISO_date",
  "loyaltyTier": "bronze|silver|gold|diamond",
  "achievements": ["achievement_id"]
}
\`\`\`

\`\`\`http
PUT /api/user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "string",
  "avatar": "string"
}
\`\`\`

## Local Coins & Payment System

### Coins Management
\`\`\`http
GET /api/user/balance
Authorization: Bearer {token}

Response: {
  "localCoins": "number",
  "usdValue": "number",
  "pendingWithdrawal": "number"
}
\`\`\`

\`\`\`http
POST /api/coins/purchase
Authorization: Bearer {token}
Content-Type: application/json

{
  "usdAmount": "number",
  "paymentMethod": "stripe|paypal|crypto",
  "paymentToken": "string"
}

Response: {
  "transactionId": "string",
  "coinsAdded": "number",
  "newBalance": "number"
}
\`\`\`

### Transaction History
\`\`\`http
GET /api/user/transactions?page=1&limit=20&type=all|deposit|withdrawal|game|box
Authorization: Bearer {token}

Response: {
  "transactions": [
    {
      "id": "string",
      "type": "deposit|withdrawal|game_win|game_loss|box_open",
      "amount": "number",
      "description": "string",
      "timestamp": "ISO_date",
      "status": "completed|pending|failed"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 150, "pages": 8 }
}
\`\`\`

## Mystery Boxes System

### Box Management
\`\`\`http
GET /api/boxes
Response: {
  "categories": [
    {
      "id": "string",
      "name": "Amazon|Call of Duty|Holidays|India|Irish Treasures",
      "boxes": [
        {
          "id": "string",
          "name": "string",
          "price": "number",
          "image": "string",
          "rarity": "common|rare|epic|legendary",
          "trending": "boolean",
          "totalOpened": "number",
          "prizes": [
            {
              "id": "string",
              "name": "string",
              "value": "number",
              "rarity": "string",
              "probability": "number",
              "image": "string"
            }
          ]
        }
      ]
    }
  ]
}
\`\`\`

\`\`\`http
POST /api/boxes/{boxId}/open
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": "number",
  "paymentMethod": "coins|usd"
}

Response: {
  "results": [
    {
      "prize": {
        "id": "string",
        "name": "string",
        "value": "number",
        "rarity": "string",
        "image": "string"
      },
      "coinValue": "number"
    }
  ],
  "totalValue": "number",
  "newBalance": "number",
  "transactionId": "string"
}
\`\`\`

## Games System

### Game Categories & Management
\`\`\`http
GET /api/games
Response: {
  "categories": [
    {
      "name": "Mystery Boxes|Battles|Crash|Plinko|Number Games|Earn Games",
      "games": [
        {
          "id": "string",
          "name": "string",
          "type": "mystery_box|battle|crash|plinko|keno|mines|jump_irish",
          "minBet": "number",
          "maxBet": "number",
          "houseEdge": "number",
          "isActive": "boolean",
          "playerCount": "number"
        }
      ]
    }
  ]
}
\`\`\`

### Specific Game Endpoints

#### Jump Irish Guy (Free Coin Game)
\`\`\`http
POST /api/games/jump-irish-guy/play
Authorization: Bearer {token}

Response: {
  "coinsEarned": "number",
  "newBalance": "number",
  "nextPlayTime": "ISO_date",
  "dailyLimit": { "played": 5, "max": 10 }
}
\`\`\`

#### Crash Game
\`\`\`http
POST /api/games/crash/bet
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": "number",
  "autoCashout": "number" // optional
}

Response: {
  "gameId": "string",
  "betId": "string",
  "amount": "number",
  "newBalance": "number"
}
\`\`\`

\`\`\`http
POST /api/games/crash/cashout
Authorization: Bearer {token}
Content-Type: application/json

{
  "gameId": "string",
  "betId": "string"
}

Response: {
  "success": "boolean",
  "multiplier": "number",
  "winAmount": "number",
  "newBalance": "number"
}
\`\`\`

#### Plinko
\`\`\`http
POST /api/games/plinko/drop
Authorization: Bearer {token}
Content-Type: application/json

{
  "betAmount": "number",
  "risk": "low|medium|high",
  "rows": "8|12|16"
}

Response: {
  "path": ["number"], // ball path
  "multiplier": "number",
  "winAmount": "number",
  "newBalance": "number"
}
\`\`\`

#### Celtic Keno
\`\`\`http
POST /api/games/keno/play
Authorization: Bearer {token}
Content-Type: application/json

{
  "betAmount": "number",
  "selectedNumbers": ["number"], // 1-10 numbers from 1-80
  "risk": "classic|low|medium|high"
}

Response: {
  "drawnNumbers": ["number"], // 20 numbers drawn
  "matches": "number",
  "multiplier": "number",
  "winAmount": "number",
  "newBalance": "number"
}
\`\`\`

#### Shamrock Mines
\`\`\`http
POST /api/games/mines/play
Authorization: Bearer {token}
Content-Type: application/json

{
  "betAmount": "number",
  "mineCount": "number", // 1-24
  "revealedTiles": ["number"] // tile positions
}

Response: {
  "gameId": "string",
  "minePositions": ["number"], // only if game over
  "currentMultiplier": "number",
  "canCashout": "boolean",
  "gameStatus": "active|won|lost"
}
\`\`\`

#### Box Battles
\`\`\`http
POST /api/games/battle/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "boxId": "string",
  "playerCount": "2|3|4",
  "isPrivate": "boolean",
  "password": "string" // if private
}

Response: {
  "battleId": "string",
  "joinCode": "string",
  "status": "waiting|active|completed"
}
\`\`\`

\`\`\`http
POST /api/games/battle/join
Authorization: Bearer {token}
Content-Type: application/json

{
  "battleId": "string",
  "password": "string" // if private battle
}

Response: {
  "success": "boolean",
  "battle": {
    "id": "string",
    "players": ["user_object"],
    "status": "waiting|active|completed",
    "results": ["prize_object"] // if completed
  }
}
\`\`\`

## Live Activity & Real-time Features

### Live Drops
\`\`\`http
GET /api/live-drops?limit=50
Response: {
  "drops": [
    {
      "id": "string",
      "username": "string",
      "avatar": "string",
      "item": "string",
      "value": "number",
      "game": "string",
      "timestamp": "ISO_date"
    }
  ]
}
\`\`\`

## WebSocket Events (Socket.IO)

### Connection & Authentication
\`\`\`javascript
// Client connects with JWT token
socket.emit('authenticate', { token: 'jwt_token' });

// Server response
socket.on('authenticated', { userId: 'string', username: 'string' });
socket.on('authentication_error', { message: 'Invalid token' });
\`\`\`

### Live Drops
\`\`\`javascript
// Server broadcasts new drops
socket.on('new_drop', {
  username: 'string',
  avatar: 'string',
  item: 'string',
  value: 'number',
  game: 'string',
  timestamp: 'ISO_date'
});
\`\`\`

### Game Events

#### Crash Game
\`\`\`javascript
// Join crash game room
socket.emit('join_crash_game');

// Game events
socket.on('crash_game_started', { gameId: 'string', startTime: 'timestamp' });
socket.on('crash_multiplier_update', { multiplier: 'number' });
socket.on('crash_game_crashed', { finalMultiplier: 'number', gameId: 'string' });
socket.on('player_cashed_out', { username: 'string', multiplier: 'number', amount: 'number' });
\`\`\`

#### Box Battles
\`\`\`javascript
// Join battle room
socket.emit('join_battle', { battleId: 'string' });

// Battle events
socket.on('player_joined', { player: 'user_object', playerCount: 'number' });
socket.on('battle_started', { battleId: 'string', players: ['user_object'] });
socket.on('box_opened', { playerId: 'string', prize: 'prize_object', round: 'number' });
socket.on('battle_completed', { winner: 'user_object', results: ['prize_object'] });
\`\`\`

### User Activity
\`\`\`javascript
// User balance updates
socket.on('balance_updated', { newBalance: 'number', change: 'number' });

// Achievement unlocked
socket.on('achievement_unlocked', { achievement: 'achievement_object' });

// Level up
socket.on('level_up', { newLevel: 'number', rewards: 'reward_object' });
\`\`\`

## Data Models

### User Model
\`\`\`typescript
interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  localCoins: number;
  level: number;
  experience: number;
  totalWagered: number;
  totalWon: number;
  winRate: number;
  loyaltyTier: 'bronze' | 'silver' | 'gold' | 'diamond';
  achievements: string[];
  joinDate: Date;
  lastActive: Date;
  isActive: boolean;
  country: string;
  dateOfBirth: Date;
  kycStatus: 'pending' | 'verified' | 'rejected';
}
\`\`\`

### Transaction Model
\`\`\`typescript
interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'game_win' | 'game_loss' | 'box_open' | 'bonus';
  amount: number;
  description: string;
  gameId?: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  metadata?: Record<string, any>;
}
\`\`\`

### Game Session Model
\`\`\`typescript
interface GameSession {
  id: string;
  userId: string;
  gameType: string;
  betAmount: number;
  winAmount: number;
  multiplier: number;
  gameData: Record<string, any>;
  status: 'active' | 'completed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
}
\`\`\`

### Mystery Box Model
\`\`\`typescript
interface MysteryBox {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isActive: boolean;
  totalOpened: number;
  prizes: Prize[];
  createdAt: Date;
}

interface Prize {
  id: string;
  name: string;
  value: number;
  rarity: string;
  probability: number;
  image: string;
  category: string;
}
\`\`\`

## Security & Compliance

### Rate Limiting
- Authentication endpoints: 5 requests per minute
- Game play endpoints: 10 requests per minute per user
- Box opening: 20 requests per minute per user
- General API: 100 requests per minute per user

### Data Validation
- All monetary amounts must be validated server-side
- Game results must be cryptographically verifiable
- User inputs must be sanitized and validated
- JWT tokens must be properly verified

### Audit Trail
- All financial transactions must be logged
- Game results must be stored with provably fair data
- User actions must be tracked for compliance
- System events must be monitored

## Environment Variables
\`\`\`env
# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Payment Providers
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Game Configuration
HOUSE_EDGE_CRASH=0.01
HOUSE_EDGE_PLINKO=0.01
HOUSE_EDGE_KENO=0.05
HOUSE_EDGE_MINES=0.01

# Coins System
LOCAL_COINS_PER_USD=25
MIN_DEPOSIT_USD=5
MIN_WITHDRAWAL_USD=10

# WebSocket
SOCKET_IO_CORS_ORIGIN=http://localhost:3000
\`\`\`

## Deployment Notes

### Required Services
- PostgreSQL database for persistent data
- Redis for caching and session management
- WebSocket server for real-time features
- Payment processor integration (Stripe/PayPal)
- File storage for images (AWS S3/Cloudinary)

### Scaling Considerations
- Implement horizontal scaling for game servers
- Use Redis pub/sub for multi-server WebSocket communication
- Database read replicas for analytics queries
- CDN for static assets and images
- Load balancing for API endpoints

This documentation provides a comprehensive guide for implementing the backend infrastructure needed to support the O Sortudo Irish gaming platform with all its features including mystery boxes, various games, real-time updates, and the Local Coins system.
