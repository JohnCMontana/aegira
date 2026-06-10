import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Panel } from '../components/core';

export function LoginView() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setSubmitting(true);

    try {
      await login(username, password);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-sm">
        <Panel title="Aegira // Core Authentication">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input 
              label="Security Principal ID" 
              placeholder="e.g., wazuh-wui"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input 
              label="Access Secret Token" 
              type="password" 
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {apiError && (
              <div className="bg-alert-high/10 border border-alert-high/20 text-alert-high text-xs p-3 rounded-soc">
                ERR: {apiError}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full mt-2" disabled={submitting}>
              {submitting ? 'Verifying...' : 'Access Console'}
            </Button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
