const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function buildUrl(path) {
  if (!API_URL) return path;
  return `${API_URL}${path}`;
}

export const authService = {
  async login(username, password) {
    let response;
    try {
      response = await fetch(buildUrl('/security/user/authenticate'), {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error(`Failed to reach API at ${buildUrl('') || 'same-origin proxy'}`, { cause: err });
      }
      throw err;
    }

    if (!response.ok) throw new Error('Network authentication request failed');
    const payload = await response.json();
    
    if (payload.error !== 0) {
      throw new Error(payload.detail || 'Invalid operational credentials');
    }

    localStorage.setItem('aegira_token', payload.data.token);
    return payload.data.token;
  },

  logout() {
    localStorage.removeItem('aegira_token');
  },

  getToken() {
    return localStorage.getItem('aegira_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};
