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
  Grid,
  Chip,
  Alert,
  Autocomplete,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Close,
  Send,
  AccountBalanceWallet,
  Person,
  AttachMoney,
} from '@mui/icons-material';
import { motion } from 'motion/react';
import { useSnackbar } from 'notistack';

interface TransferModalProps {
  open: boolean;
  onClose: () => void;
}

const MotionDialog = motion.create(Dialog);

// Mock data para contactos recientes
const recentContacts = [
  { alias: 'juan.crypto', cvu: '0000003100012345678902', name: 'Juan Pérez' },
  { alias: 'maria.wallet', cvu: '0000003100012345678903', name: 'María García' },
  { alias: 'carlos.pay', cvu: '0000003100012345678904', name: 'Carlos López' },
];

const TransferModal: React.FC<TransferModalProps> = ({ open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [transferData, setTransferData] = useState({
    recipient: '',
    amount: '',
    description: '',
    method: 'alias', // 'alias' | 'cvu'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setTransferData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!transferData.recipient || !transferData.amount) {
      enqueueSnackbar('Complete todos los campos requeridos', { variant: 'error' });
      return;
    }

    setLoading(true);
    
    // Simular transferencia
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    enqueueSnackbar(
      `Transferencia de $${Number(transferData.amount).toLocaleString()} enviada exitosamente a ${transferData.recipient}`,
      { variant: 'success' }
    );
    
    setLoading(false);
    onClose();
    setTransferData({ recipient: '', amount: '', description: '', method: 'alias' });
  };

  const selectContact = (contact: typeof recentContacts[0]) => {
    setTransferData(prev => ({
      ...prev,
      recipient: prev.method === 'alias' ? contact.alias : contact.cvu,
    }));
  };

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
          <Send color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Transferir Dinero
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          💡 <strong>Demo Mode:</strong> Esta es una transferencia simulada. Los datos no son reales.
        </Alert>

        {/* Método de transferencia */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Método de Transferencia
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label="Por Alias"
              icon={<Person />}
              color={transferData.method === 'alias' ? 'primary' : 'default'}
              onClick={() => handleInputChange('method', 'alias')}
              clickable
            />
            <Chip
              label="Por CVU"
              icon={<AccountBalanceWallet />}
              color={transferData.method === 'cvu' ? 'primary' : 'default'}
              onClick={() => handleInputChange('method', 'cvu')}
              clickable
            />
          </Box>
        </Box>

        {/* Destinatario */}
        <TextField
          fullWidth
          label={transferData.method === 'alias' ? 'Alias del destinatario' : 'CVU del destinatario'}
          placeholder={transferData.method === 'alias' ? 'usuario.crypto' : '0000003100012345678901'}
          value={transferData.recipient}
          onChange={(e) => handleInputChange('recipient', e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {transferData.method === 'alias' ? <Person /> : <AccountBalanceWallet />}
              </InputAdornment>
            ),
          }}
        />

        {/* Contactos recientes */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Contactos Recientes
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {recentContacts.map((contact) => (
              <Chip
                key={contact.alias}
                label={contact.alias}
                size="small"
                onClick={() => selectContact(contact)}
                clickable
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Monto */}
        <TextField
          fullWidth
          label="Monto a transferir"
          type="number"
          value={transferData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          helperText="Monto mínimo: $100 - Máximo diario: $50,000"
        />

        {/* Descripción */}
        <TextField
          fullWidth
          label="Descripción (opcional)"
          multiline
          rows={2}
          value={transferData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Motivo de la transferencia..."
        />

        {/* Resumen */}
        {transferData.amount && transferData.recipient && (
          <Box sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: 'action.hover', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Resumen de Transferencia
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Destinatario:</Typography>
                <Typography variant="body2" fontWeight={600}>{transferData.recipient}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Monto:</Typography>
                <Typography variant="body2" fontWeight={600} color="primary.main">
                  ${Number(transferData.amount).toLocaleString()}
                </Typography>
              </Box>
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
          disabled={!transferData.recipient || !transferData.amount || loading}
          loading={loading}
          startIcon={<Send />}
        >
          {loading ? 'Enviando...' : 'Transferir'}
        </Button>
      </DialogActions>
    </MotionDialog>
  );
};

export default TransferModal;
