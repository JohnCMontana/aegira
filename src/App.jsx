import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/Control-Hub';

function RootRouter() {
  const { isAuthenticated } = useAuth();
  
  // Minimalist conditional route switching
  return isAuthenticated ? <DashboardView /> : <LoginView />;
}

function App() {
  return (
    <AuthProvider>
      <RootRouter />
    </AuthProvider>
  );
}

export default App;
