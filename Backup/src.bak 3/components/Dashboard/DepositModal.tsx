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
} from '@mui/material';
import {
  Close,
  Add,
  CreditCard,
  AccountBalance,
  QrCode,
  AttachMoney,
} from '@mui/icons-material';
import { motion } from 'motion/react';
import { useSnackbar } from 'notistack';

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

const MotionDialog = motion.create(Dialog);

const depositMethods = [
  {
    id: 'bank_transfer',
    label: 'Transferencia Bancaria',
    icon: AccountBalance,
    description: 'Transferí desde tu cuenta bancaria',
    fee: 'Sin costo',
    time: '24-48 hs',
  },
  {
    id: 'debit_card',
    label: 'Tarjeta de Débito',
    icon: CreditCard,
    description: 'Carga instantánea con tu tarjeta',
    fee: '2.5%',
    time: 'Inmediato',
  },
  {
    id: 'qr_code',
    label: 'Código QR',
    icon: QrCode,
    description: 'Escanea y paga desde otra app',
    fee: 'Sin costo',
    time: '5-10 min',
  },
];

const quickAmounts = [1000, 5000, 10000, 25000, 50000];

const DepositModal: React.FC<DepositModalProps> = ({ open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [depositData, setDepositData] = useState({
    amount: '',
    method: 'bank_transfer',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setDepositData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickAmount = (amount: number) => {
    setDepositData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = async () => {
    if (!depositData.amount) {
      enqueueSnackbar('Ingrese un monto válido', { variant: 'error' });
      return;
    }

    const amount = Number(depositData.amount);
    if (amount < 100) {
      enqueueSnackbar('El monto mínimo es $100', { variant: 'error' });
      return;
    }

    setLoading(true);
    
    // Simular carga
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedMethod = depositMethods.find(m => m.id === depositData.method);
    enqueueSnackbar(
      `Solicitud de carga por $${amount.toLocaleString()} mediante ${selectedMethod?.label} enviada exitosamente`,
      { variant: 'success' }
    );
    
    setLoading(false);
    onClose();
    setDepositData({ amount: '', method: 'bank_transfer' });
  };

  const selectedMethod = depositMethods.find(m => m.id === depositData.method);
  const amount = Number(depositData.amount);
  const fee = selectedMethod?.id === 'debit_card' ? amount * 0.025 : 0;
  const totalAmount = amount + fee;

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
          <Add color="success" />
          <Typography variant="h6" fontWeight={600}>
            Cargar Dinero
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          💡 <strong>Demo Mode:</strong> Esta es una carga simulada. Los datos no son reales.
        </Alert>

        {/* Monto */}
        <TextField
          fullWidth
          label="Monto a cargar"
          type="number"
          value={depositData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <AttachMoney />,
          }}
          helperText="Monto mínimo: $100 - Máximo: $100,000"
        />

        {/* Montos rápidos */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Montos Rápidos
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {quickAmounts.map((amount) => (
              <Chip
                key={amount}
                label={`$${amount.toLocaleString()}`}
                size="small"
                onClick={() => handleQuickAmount(amount)}
                clickable
                variant="outlined"
                color={depositData.amount === amount.toString() ? 'primary' : 'default'}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Método de carga */}
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Método de Carga
        </Typography>

        <RadioGroup
          value={depositData.method}
          onChange={(e) => handleInputChange('method', e.target.value)}
        >
          {depositMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <Card
                key={method.id}
                variant="outlined"
                sx={{
                  mb: 1,
                  cursor: 'pointer',
                  border: depositData.method === method.id ? '2px solid' : '1px solid',
                  borderColor: depositData.method === method.id ? 'primary.main' : 'divider',
                  '&:hover': { borderColor: 'primary.main' },
                }}
                onClick={() => handleInputChange('method', method.id)}
              >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControlLabel
                      value={method.id}
                      control={<Radio />}
                      label=""
                      sx={{ m: 0 }}
                    />
                    <IconComponent color="primary" />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {method.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {method.description}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="success.main" fontWeight={600}>
                        {method.fee}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {method.time}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </RadioGroup>

        {/* Resumen */}
        {depositData.amount && selectedMethod && (
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: 'action.hover', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>
              Resumen de Carga
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Monto:</Typography>
              <Typography variant="body2" fontWeight={600}>
                ${amount.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Comisión:</Typography>
              <Typography variant="body2" fontWeight={600}>
                ${fee.toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" fontWeight={600}>Total:</Typography>
              <Typography variant="body2" fontWeight={600} color="primary.main">
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
          disabled={!depositData.amount || loading}
          loading={loading}
          startIcon={<Add />}
          color="success"
        >
          {loading ? 'Procesando...' : 'Cargar Dinero'}
        </Button>
      </DialogActions>
    </MotionDialog>
  );
};

export default DepositModal;
