import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  Close,
  History,
  TrendingUp,
  TrendingDown,
  Send,
  GetApp,
  Search,
  FilterList,
} from '@mui/icons-material';
import { motion } from 'motion/react';

interface TransactionHistoryModalProps {
  open: boolean;
  onClose: () => void;
}

const MotionDialog = motion.create(Dialog);

// Mock transaction data
const mockTransactions = [
  {
    id: '1',
    type: 'deposit',
    description: 'Carga de dinero - Transferencia bancaria',
    amount: 50000,
    date: '2025-01-20T10:30:00Z',
    status: 'completed',
    reference: 'DEP001234',
  },
  {
    id: '2',
    type: 'transfer_out',
    description: 'Transferencia a juan.crypto',
    amount: -15000,
    date: '2025-01-19T16:45:00Z',
    status: 'completed',
    reference: 'TRF001235',
  },
  {
    id: '3',
    type: 'transfer_in',
    description: 'Recibido de maria.wallet',
    amount: 8500,
    date: '2025-01-18T14:20:00Z',
    status: 'completed',
    reference: 'TRF001236',
  },
  {
    id: '4',
    type: 'withdraw',
    description: 'Retiro a Banco Galicia - ****5678',
    amount: -25000,
    date: '2025-01-17T09:15:00Z',
    status: 'pending',
    reference: 'WTH001237',
  },
  {
    id: '5',
    type: 'deposit',
    description: 'Carga de dinero - Tarjeta de débito',
    amount: 10000,
    date: '2025-01-16T20:10:00Z',
    status: 'completed',
    reference: 'DEP001238',
  },
  {
    id: '6',
    type: 'transfer_out',
    description: 'Transferencia a carlos.pay',
    amount: -3200,
    date: '2025-01-15T11:30:00Z',
    status: 'completed',
    reference: 'TRF001239',
  },
];

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'deposit': return <TrendingUp color="success" />;
    case 'withdraw': return <TrendingDown color="warning" />;
    case 'transfer_out': return <Send color="primary" />;
    case 'transfer_in': return <GetApp color="info" />;
    default: return <History />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'success';
    case 'pending': return 'warning';
    case 'failed': return 'error';
    default: return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Completada';
    case 'pending': return 'Pendiente';
    case 'failed': return 'Fallida';
    default: return status;
  }
};

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({ open, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <MotionDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <History color="info" />
          <Typography variant="h6" fontWeight={600}>
            Historial de Transacciones
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          💡 <strong>Demo Mode:</strong> Estas son transacciones simuladas para demostración.
        </Alert>

        {/* Filtros */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200, flexGrow: 1 }}
          />
          
          <TextField
            select
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">Todas</MenuItem>
            <MenuItem value="deposit">Cargas</MenuItem>
            <MenuItem value="withdraw">Retiros</MenuItem>
            <MenuItem value="transfer_out">Enviadas</MenuItem>
            <MenuItem value="transfer_in">Recibidas</MenuItem>
          </TextField>
        </Box>

        {/* Lista de transacciones */}
        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredTransactions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No se encontraron transacciones con los filtros aplicados
              </Typography>
            </Box>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <React.Fragment key={transaction.id}>
                <ListItem
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {getTransactionIcon(transaction.type)}
                    </Avatar>
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight={600}>
                          {transaction.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                        >
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(transaction.date)}
                          </Typography>
                          <Chip
                            label={getStatusLabel(transaction.status)}
                            size="small"
                            color={getStatusColor(transaction.status) as any}
                            variant="outlined"
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Ref: {transaction.reference}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < filteredTransactions.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>

        {/* Resumen */}
        <Box sx={{ 
          mt: 3, 
          p: 2, 
          bgcolor: 'action.hover', 
          borderRadius: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 2
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Total Transacciones
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {filteredTransactions.length}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Ingresos
            </Typography>
            <Typography variant="h6" fontWeight={600} color="success.main">
              +${filteredTransactions
                .filter(t => t.amount > 0)
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Egresos
            </Typography>
            <Typography variant="h6" fontWeight={600} color="error.main">
              ${filteredTransactions
                .filter(t => t.amount < 0)
                .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                .toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </MotionDialog>
  );
};

export default TransactionHistoryModal;
