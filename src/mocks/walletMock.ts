// src/mocks/walletMock.ts
export const mockWalletData = {
  alias: 'crypto.wizard',
  balance: 125480.50,
  cvu: '0000003100012345678901',
  currency: 'ARS',
  level: 'Premium',
  score: 8.7,
  growth: 12.5,
  monthlyLimit: 500000,
  monthlyUsed: 285000,
  dailyLimit: 50000,
  dailyUsed: 45000,
  transactions: 247,
  lastUpdate: new Date().toISOString(),
  accountHealth: 95,
  rewardsPoints: 1250,
  cardType: 'Visa Platinum',
  cardNumber: '4532 **** **** 9012',
  cardExpiry: '12/25',
  cardHolder: 'JUAN PÉREZ',
  securityLevel: 'Alto',
  verificationStatus: 'Verificado',
  cards: [
    {
      id: '1',
      type: 'debit',
      brand: 'Visa',
      lastFour: '9012',
      expMonth: 12,
      expYear: 25,
      status: 'active'
    },
    {
      id: '2',
      type: 'credit',
      brand: 'Mastercard',
      lastFour: '5678',
      expMonth: 10,
      expYear: 26,
      status: 'active'
    }
  ],
  limits: {
    daily: {
      transfer: 50000,
      withdrawal: 30000,
      deposit: 100000
    },
    monthly: {
      transfer: 500000,
      withdrawal: 300000,
      deposit: 1000000
    }
  }
};
