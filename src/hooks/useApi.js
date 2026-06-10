import { useState, useCallback } from 'react';
import { authService } from '../services/auth';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function buildUrl(path) {
  if (!API_URL) return path;
  return `${API_URL}${path}`;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    const token = authService.getToken();

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(buildUrl(endpoint), { ...options, headers });
      if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
      
      const payload = await response.json();
      if (payload.error !== 0) throw new Error(payload.detail || 'Wazuh Cluster Error');
      
      return payload.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}
