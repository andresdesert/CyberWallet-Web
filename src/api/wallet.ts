// src/api/wallet.ts
import api from './axiosInstance';
import log from 'loglevel';
import { mockWalletData } from '@/mocks/walletMock';

interface ApiError {
  response?: {
    data?: {
      detail?: string;
    };
  };
  message?: string;
}

interface WalletDetails {
  alias: string;
  balance: number;
  cvu: string;
  level: string;
  score: number;
  growth: number;
  monthlyLimit: number;
  monthlyUsed: number;
  dailyLimit: number;
  dailyUsed: number;
  transactions: number;
  lastUpdate: string;
  accountHealth: number;
  rewardsPoints: number;
  cards: Array<{
    id: string;
    type: string;
    brand: string;
    lastFour: string;
    expMonth: number;
    expYear: number;
    status: string;
  }>;
}

interface TransferByAliasRequest {
  targetAlias: string;
  amount: number;
  description?: string;
}

interface TransferByCvuRequest {
  targetCvu: string;
  amount: number;
  description?: string;
}

interface DepositRequest {
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  description?: string;
}

interface WithdrawRequest {
  amount: number;
  cbu: string;
  description?: string;
}

interface UpdateAliasRequest {
  alias: string;
}

interface LoadCardRequest {
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const getWalletDetails = async (): Promise<WalletDetails> => {
  try {
    // Simulamos un delay para hacer más realista la experiencia
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockWalletData;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al obtener detalles de la billetera';
    log.error('[WALLET] Get details failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const transferByAlias = async (request: TransferByAliasRequest): Promise<void> => {
  try {
    // Simular delay y validación
    await new Promise(resolve => setTimeout(resolve, 500));
    if (request.amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    if (request.amount > mockWalletData.balance) {
      throw new Error('Saldo insuficiente');
    }
    if (!request.targetAlias || request.targetAlias.length < 3) {
      throw new Error('Alias inválido');
    }
    log.info('[WALLET] Transferencia por alias simulada exitosa:', request);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al transferir por alias';
    log.error('[WALLET] Transfer by alias failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const transferByCvu = async (request: TransferByCvuRequest): Promise<void> => {
  try {
    // Simular delay y validación
    await new Promise(resolve => setTimeout(resolve, 500));
    if (request.amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    if (request.amount > mockWalletData.balance) {
      throw new Error('Saldo insuficiente');
    }
    if (!request.targetCvu || request.targetCvu.length !== 22) {
      throw new Error('CVU inválido');
    }
    log.info('[WALLET] Transferencia por CVU simulada exitosa:', request);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al transferir por CVU';
    log.error('[WALLET] Transfer by CVU failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const deposit = async (request: DepositRequest): Promise<void> => {
  try {
    // Simular delay y validación
    await new Promise(resolve => setTimeout(resolve, 500));
    if (request.amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    log.info('[WALLET] Depósito simulado exitoso:', request);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al realizar el depósito';
    log.error('[WALLET] Deposit failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const withdraw = async (request: WithdrawRequest): Promise<void> => {
  try {
    // Simular delay y validación
    await new Promise(resolve => setTimeout(resolve, 500));
    if (request.amount <= 0) {
      throw new Error('El monto debe ser mayor a 0');
    }
    if (request.amount > mockWalletData.balance) {
      throw new Error('Saldo insuficiente');
    }
    log.info('[WALLET] Retiro simulado exitoso:', request);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al realizar el retiro';
    log.error('[WALLET] Withdraw failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const updateAlias = async (request: UpdateAliasRequest): Promise<void> => {
  try {
    // Simular delay y validación
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!request.alias || request.alias.length < 3) {
      throw new Error('El alias debe tener al menos 3 caracteres');
    }
    log.info('[WALLET] Alias actualizado simulado:', request);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al actualizar el alias';
    log.error('[WALLET] Update alias failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const getTransactionHistory = async (): Promise<unknown[]> => {
  try {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 300));
    // Generar transacciones simuladas
    const transactions = [];
    for (let i = 0; i < 10; i++) {
      transactions.push({
        id: `tx-${Math.random().toString(36).substr(2, 9)}`,
        type: Math.random() > 0.5 ? 'deposit' : 'withdrawal',
        amount: Math.floor(Math.random() * 10000),
        status: 'completed',
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    return transactions;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al obtener el historial de transacciones';
    log.error('[WALLET] Get transaction history failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const getBalance = async (): Promise<number> => {
  try {
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockWalletData.balance;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Error al obtener el saldo';
    log.error('[WALLET] Get balance failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Funciones adicionales que faltaban
export const depositFunds = async (request: DepositRequest): Promise<void> => {
  return deposit(request);
};

export const withdrawFunds = async (request: WithdrawRequest): Promise<void> => {
  return withdraw(request);
};

export const updateWalletAlias = async (request: UpdateAliasRequest): Promise<void> => {
  return updateAlias(request);
};

export const loadCardFunds = async (request: LoadCardRequest): Promise<void> => {
  try {
    await api.post<ApiResponse<void>>('/wallet/load-card', request);
  } catch (err: unknown) {
    const apiError = err as ApiError;
    const errorMessage = apiError.response?.data?.detail || 'Error al cargar fondos con tarjeta';
    log.error('[WALLET] Load card funds failed:', errorMessage);
    throw new Error(errorMessage);
  }
}; 