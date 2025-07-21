// src/mocks/transactionsMock.ts
export const mockTransactions = [
  { 
    id: '1', 
    type: 'INCOME', 
    amount: 15000, 
    description: 'Transferencia recibida', 
    date: '2024-01-15T10:00:00Z', 
    category: 'transfer',
    status: 'completed',
    sender: 'Juan Pérez',
    reference: 'REF-001'
  },
  { 
    id: '2', 
    type: 'EXPENSE', 
    amount: -2500, 
    description: 'Compra en Mercado Libre', 
    date: '2024-01-14T15:30:00Z', 
    category: 'shopping',
    status: 'completed',
    recipient: 'Mercado Libre',
    reference: 'REF-002'
  },
  { 
    id: '3', 
    type: 'INCOME', 
    amount: 8000, 
    description: 'Pago freelance', 
    date: '2024-01-13T09:15:00Z', 
    category: 'work',
    status: 'completed',
    sender: 'Cliente Freelance',
    reference: 'REF-003'
  },
  { 
    id: '4', 
    type: 'EXPENSE', 
    amount: -1200, 
    description: 'Netflix Premium', 
    date: '2024-01-12T12:00:00Z', 
    category: 'subscription',
    status: 'completed',
    recipient: 'Netflix',
    reference: 'REF-004'
  },
  { 
    id: '5', 
    type: 'EXPENSE', 
    amount: -4500, 
    description: 'Supermercado', 
    date: '2024-01-11T18:45:00Z', 
    category: 'shopping',
    status: 'completed',
    recipient: 'Supermercado Local',
    reference: 'REF-005'
  }
];
