// src/hooks/useApiErrorNotifications.ts
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { ErrorNotificationSystem, NetworkMonitor } from '@/api/axiosInstance';

interface NotificationOptions {
  enableNetworkStatus?: boolean;
  enableRetryNotifications?: boolean;
  maxNotifications?: number;
}

/**
 * Hook personalizado para manejar notificaciones de errores de API
 * Integra el ErrorNotificationSystem con la UI usando notistack
 */
export const useApiErrorNotifications = (options: NotificationOptions = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    enableNetworkStatus = true,
    enableRetryNotifications = true,
    maxNotifications = 3
  } = options;

  useEffect(() => {
    let notificationCount = 0;
    const activeNotifications = new Set<string>();

    // Listener para notificaciones de errores
    const removeErrorListener = ErrorNotificationSystem.addListener((notification) => {
      // Limitar el número de notificaciones activas
      if (notificationCount >= maxNotifications) {
        return;
      }

      const notificationKey = `${notification.type}-${Date.now()}`;
      
      if (!activeNotifications.has(notificationKey)) {
        activeNotifications.add(notificationKey);
        notificationCount++;

        enqueueSnackbar(notification.message, {
          variant: notification.type,
          autoHideDuration: notification.duration || 5000,
          preventDuplicate: true,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          onClose: () => {
            activeNotifications.delete(notificationKey);
            notificationCount--;
          },
        });

        // Cleanup automático después del timeout
        setTimeout(() => {
          activeNotifications.delete(notificationKey);
          if (notificationCount > 0) {
            notificationCount--;
          }
        }, notification.duration || 5000);
      }
    });

    // Listener para estado de red si está habilitado
    let removeNetworkListener: (() => void) | undefined;
    
    if (enableNetworkStatus) {
      removeNetworkListener = NetworkMonitor.addListener((isOnline) => {
        if (isOnline) {
          enqueueSnackbar('Conexión restaurada', {
            variant: 'success',
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
        } else {
          enqueueSnackbar('Sin conexión a internet', {
            variant: 'warning',
            persist: true,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          });
        }
      });
    }

    // Cleanup
    return () => {
      removeErrorListener();
      removeNetworkListener?.();
      ErrorNotificationSystem.clearQueue();
    };
  }, [
    enqueueSnackbar, 
    enableNetworkStatus, 
    enableRetryNotifications, 
    maxNotifications
  ]);

  // Retornar utilidades para control manual de notificaciones
  return {
    notifyError: (message: string, duration?: number) => {
      ErrorNotificationSystem.notify(message, 'error', duration);
    },
    notifyWarning: (message: string, duration?: number) => {
      ErrorNotificationSystem.notify(message, 'warning', duration);
    },
    notifyInfo: (message: string, duration?: number) => {
      ErrorNotificationSystem.notify(message, 'info', duration);
    },
    clearNotifications: () => {
      ErrorNotificationSystem.clearQueue();
    },
    getNetworkStatus: () => NetworkMonitor.getStatus(),
  };
};
