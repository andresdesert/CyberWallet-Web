import { describe, it, expect } from 'vitest';

describe('Utility Functions', () => {
  it('should format currency correctly', () => {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }).format(amount);
    };
    
    expect(formatCurrency(1000)).toContain('1.000');
  });

  it('should validate email format', () => {
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  it('should handle date operations', () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    
    expect(tomorrow.getDate()).toBe(now.getDate() + 1);
  });
});
