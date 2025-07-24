import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Alert,
  Card,
  CardContent,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from '@mui/material';
import {
  Close,
  Remove,
  AccountBalance,
  AttachMoney,
  Security,
} from '@mui/icons-material';
import { motion } from 'motion/react';
import { useSnackbar } from 'notistack';

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
}

const MotionDialog = motion.create(Dialog);

const withdrawMethods = [
  {
    id: 'bank_transfer',
    label: 'Transferencia a Cuenta Bancaria',
    icon: AccountBalance,
    description: 'Retirá a tu cuenta bancaria',
    fee: '$50',
    time: '24-48 hs',
  },
];

const mockBankAccounts = [
  { id: '1', bank: 'Banco Nación', account: '****1234', cbu: '0110599520000001234567' },
  { id: '2', bank: 'Banco Galicia', account: '****5678', cbu: '0070285630000005678901' },
];

const quickAmounts = [1000, 5000, 10000, 25000];

const WithdrawModal: React.FC<WithdrawModalProps> = ({ open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    method: 'bank_transfer',
    bankAccount: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const availableBalance = 125480.50; // Mock balance

  const handleInputChange = (field: string, value: string) => {
    setWithdrawData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickAmount = (amount: number) => {
    setWithdrawData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = async () => {
    if (!withdrawData.amount || !withdrawData.bankAccount) {
      enqueueSnackbar('Complete todos los campos requeridos', { variant: 'error' });
      return;
    }

    const amount = Number(withdrawData.amount);
    if (amount < 100) {
      enqueueSnackbar('El monto mínimo es $100', { variant: 'error' });
      return;
    }

    if (amount > availableBalance) {
      enqueueSnackbar('Monto superior al saldo disponible', { variant: 'error' });
      return;
    }

    setLoading(true);
    
    // Simular retiro
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedAccount = mockBankAccounts.find(acc => acc.id === withdrawData.bankAccount);
    enqueueSnackbar(
      `Solicitud de retiro por $${amount.toLocaleString()} a ${selectedAccount?.bank} enviada exitosamente`,
      { variant: 'success' }
    );
    
    setLoading(false);
    onClose();
    setWithdrawData({ amount: '', method: 'bank_transfer', bankAccount: '', description: '' });
  };

  const amount = Number(withdrawData.amount);
  const fee = 50; // Fixed fee
  const totalAmount = amount + fee;
  const selectedAccount = mockBankAccounts.find(acc => acc.id === withdrawData.bankAccount);

  return (
    <MotionDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Remove color="warning" />
          <Typography variant="h6" fontWeight={600}>
            Retirar Dinero
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          💡 <strong>Demo Mode:</strong> Este es un retiro simulado. Los datos no son reales.
        </Alert>

        {/* Saldo disponible */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'success.main', 
          color: 'success.contrastText',
          borderRadius: 2,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2">Saldo Disponible:</Typography>
          <Typography variant="h6" fontWeight={600}>
            ${availableBalance.toLocaleString()}
          </Typography>
        </Box>

        {/* Cuenta bancaria */}
        <Autocomplete
          options={mockBankAccounts}
          getOptionLabel={(option) => `${option.bank} - ${option.account}`}
          renderOption={(props, option) => (
            <Box {...props} component="li">
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {option.bank}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Cuenta: {option.account} | CBU: {option.cbu}
                </Typography>
              </Box>
            </Box>
          )}
          value={mockBankAccounts.find(acc => acc.id === withdrawData.bankAccount) || null}
          onChange={(_, value) => handleInputChange('bankAccount', value?.id || '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Cuenta bancaria de destino"
              required
            />
          )}
          sx={{ mb: 2 }}
        />

        {/* Monto */}
        <TextField
          fullWidth
          label="Monto a retirar"
          type="number"
          value={withdrawData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <AttachMoney />,
          }}
          helperText={`Monto mínimo: $100 - Máximo disponible: $${availableBalance.toLocaleString()}`}
        />

        {/* Montos rápidos */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Montos Rápidos
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {quickAmounts.map((quickAmount) => (
              <Chip
                key={quickAmount}
                label={`$${quickAmount.toLocaleString()}`}
                size="small"
                onClick={() => handleQuickAmount(quickAmount)}
                clickable
                variant="outlined"
                color={withdrawData.amount === quickAmount.toString() ? 'primary' : 'default'}
                disabled={quickAmount > availableBalance}
              />
            ))}
          </Box>
        </Box>

        {/* Descripción */}
        <TextField
          fullWidth
          label="Motivo del retiro (opcional)"
          multiline
          rows={2}
          value={withdrawData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Ej: Gastos personales, transferencia familiar..."
          sx={{ mb: 3 }}
        />

        {/* Información de seguridad */}
        <Alert severity="warning" icon={<Security />} sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Seguridad:</strong> El retiro será procesado en 24-48 horas hábiles. 
            Recibirás una notificación cuando se complete la transferencia.
          </Typography>
        </Alert>

        {/* Resumen */}
        {withdrawData.amount && withdrawData.bankAccount && (
          <Box sx={{ 
            p: 2, 
            bgcolor: 'action.hover', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
              Resumen de Retiro
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Destino:</Typography>
              <Typography variant="body2" fontWeight={600}>
                {selectedAccount?.bank} - {selectedAccount?.account}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Monto:</Typography>
              <Typography variant="body2" fontWeight={600}>
                ${amount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Comisión:</Typography>
              <Typography variant="body2" fontWeight={600}>
                ${fee}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight={600}>Total a debitar:</Typography>
              <Typography variant="body2" fontWeight={600} color="warning.main">
                ${totalAmount.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!withdrawData.amount || !withdrawData.bankAccount || loading}
          loading={loading}
          startIcon={<Remove />}
          color="warning"
        >
          {loading ? 'Procesando...' : 'Retirar Dinero'}
        </Button>
      </DialogActions>
    </MotionDialog>
  );
};

export default WithdrawModal;
