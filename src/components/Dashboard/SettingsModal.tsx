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
  Alert,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Close,
  Settings,
  Person,
  Security,
  Notifications,
  Visibility,
  Edit,
  Save,
} from '@mui/icons-material';
import { motion } from 'motion/react';
import { useSnackbar } from 'notistack';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const MotionDialog = motion.create(Dialog);

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [profileData, setProfileData] = useState({
    alias: 'crypto.wizard',
    email: 'usuario@demo.com',
    phone: '+54 9 11 1234-5678',
    cvu: '0000003100012345678901',
  });
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    biometric: true,
    twoFactor: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    enqueueSnackbar('Perfil actualizado exitosamente', { variant: 'success' });
    setEditMode(false);
    setLoading(false);
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    enqueueSnackbar('Configuración guardada exitosamente', { variant: 'success' });
    setLoading(false);
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
          <Settings color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Configuración
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          💡 <strong>Demo Mode:</strong> Los cambios no se guardan realmente en esta demostración.
        </Alert>

        {/* Perfil de Usuario */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Perfil de Usuario
            </Typography>
            <IconButton 
              onClick={() => setEditMode(!editMode)}
              color={editMode ? 'primary' : 'default'}
            >
              <Edit />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {profileData.alias}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Usuario Premium
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Miembro desde Enero 2025
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Alias"
            value={profileData.alias}
            onChange={(e) => handleProfileChange('alias', e.target.value)}
            disabled={!editMode}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            value={profileData.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            disabled={!editMode}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Teléfono"
            value={profileData.phone}
            onChange={(e) => handleProfileChange('phone', e.target.value)}
            disabled={!editMode}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="CVU"
            value={profileData.cvu}
            disabled
            helperText="Tu CVU no puede ser modificado"
            sx={{ mb: 2 }}
          />

          {editMode && (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveProfile}
              loading={loading}
              fullWidth
            >
              Guardar Cambios
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Configuración de Seguridad */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Seguridad
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText
                primary="Autenticación biométrica"
                secondary="Usa tu huella o reconocimiento facial"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.biometric}
                  onChange={(e) => handleSettingChange('biometric', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Security />
              </ListItemIcon>
              <ListItemText
                primary="Autenticación de dos factores"
                secondary="Agrega una capa extra de seguridad"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.twoFactor}
                  onChange={(e) => handleSettingChange('twoFactor', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Configuración de Notificaciones */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Notificaciones
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText
                primary="Notificaciones push"
                secondary="Recibe notificaciones en tiempo real"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText
                primary="Alertas por email"
                secondary="Recibe alertas importantes por email"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.emailAlerts}
                  onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText
                primary="Alertas por SMS"
                secondary="Recibe notificaciones por mensaje de texto"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.smsAlerts}
                  onChange={(e) => handleSettingChange('smsAlerts', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>

        {/* Información de la cuenta */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'action.hover', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
            Información de la Cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Nivel:</strong> Premium
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Estado:</strong> Verificada
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Límite diario:</strong> $50,000
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Límite mensual:</strong> $500,000
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
        <Button
          onClick={handleSaveSettings}
          variant="contained"
          loading={loading}
          startIcon={<Save />}
        >
          Guardar Configuración
        </Button>
      </DialogActions>
    </MotionDialog>
  );
};

export default SettingsModal;
