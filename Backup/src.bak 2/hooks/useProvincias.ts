// src/hooks/useProvincias.ts
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import log from "loglevel";
import axios from "axios";
import { countryToIso2, validIso2Codes } from "@/helpers/constants";
import { checkProvincesEndpoint } from "@/api/healthCheck";

/**
 * Hook para obtener las provincias de un país dado.
 * Carga automáticamente desde el endpoint backend.
 */
export const useProvincias = (pais: string) => {
  const [provincias, setProvincias] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    // Evitar si no hay país
    if (!pais?.trim()) {
      setProvincias([]);
      log.debug("[useProvincias] País no definido. Provincias reseteadas.");
      return;
    }

    // --- NUEVO: Si pais es ISO2 válido, úsalo directamente; si no, mapea nombre a ISO2 ---
    let iso2 = pais.trim().toUpperCase();
    if (!validIso2Codes.includes(iso2)) {
      // Intentar mapear nombre a ISO2
      iso2 = countryToIso2[pais] || '';
    }
    if (!iso2 || !validIso2Codes.includes(iso2)) {
      log.warn(`[useProvincias] ⚠️ No se encontró ISO2 válido para país: "${pais}". No se cargan provincias.`);
      setProvincias([]);
      return;
    }

    const fetchProvinces = async () => {
      setLoading(true);
      log.info(`[useProvincias] Cargando provincias para "${pais}" (ISO2: ${iso2})`);

      try {
        // Diagnóstico inicial para verificar conectividad
        if (process.env.NODE_ENV === 'development') {
          const healthCheck = await checkProvincesEndpoint(iso2);
          if (healthCheck.isHealthy) {
            log.info(`[useProvincias] ✅ Diagnóstico exitoso: ${healthCheck.message}`);
            setProvincias(Array.isArray(healthCheck.data) ? healthCheck.data : []);
            return;
          } else {
            log.warn(`[useProvincias] ⚠️ Diagnóstico fallido: ${healthCheck.message}`);
          }
        }

        const response = await axiosInstance.get(`/validations/provinces/list/${iso2}`, {
          signal: controller.signal,
        });

        const data = response?.data?.data;
        if (Array.isArray(data) && data.length > 0) {
          setProvincias(data);
          log.debug(`[useProvincias] Provincias recibidas (${data.length}) para "${pais}":`, data);
        } else {
          log.warn(`[useProvincias] ❌ Respuesta sin datos de provincias para "${pais}".`, data);
          setProvincias([]);
        }

      } catch (error: unknown) {
        if (axios.isCancel(error)) {
          log.debug(`[useProvincias] Solicitud cancelada para "${pais}".`);
        } else {
          const apiError = error as { code?: string; response?: { status?: number; statusText?: string }; message?: string; config?: { url?: string; method?: string } };
          if (apiError.code === 'ECONNREFUSED') {
            log.error(`[useProvincias] ❌ No se puede conectar al backend para "${pais}". ¿Está ejecutándose en el puerto 8080?`);
          } else if (apiError.code === 'ECONNABORTED') {
            log.error(`[useProvincias] ⏱️ Timeout al obtener provincias para "${pais}".`);
          } else if (apiError.response?.status === 404) {
            log.error(`[useProvincias] 🔍 Endpoint no encontrado para "${pais}". Verifica la URL del backend.`);
          } else if (apiError.response?.status === 500) {
            log.error(`[useProvincias] 🔥 Error interno del servidor para "${pais}".`);
          } else {
            log.error(`[useProvincias] ❌ Error al obtener provincias para "${pais}":`, {
              message: apiError.message,
              status: apiError.response?.status,
              statusText: apiError.response?.statusText,
              url: apiError.config?.url,
              method: apiError.config?.method
            });
          }
          setProvincias([]);
        }
      } finally {
        setLoading(false);
        log.debug(`[useProvincias] Carga finalizada para "${pais}".`);
      }
    };

    fetchProvinces();

    return () => {
      controller.abort();
      log.debug(`[useProvincias] Cleanup: abortando solicitud para "${pais}".`);
    };
  }, [pais]);

  return { provincias, loading };
};
