
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { ScannerView } from './components/ScannerView';
import { Education } from './views/Education';
import { Community } from './views/Community';
import { Login } from './views/Login';
import { DeployGuide } from './views/DeployGuide';
import { AppView, User } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string) => {
    setUser({
      username: username,
      avatar: username.charAt(0).toUpperCase(),
      isLoggedIn: true
    });
    setCurrentView(AppView.COMMUNITY); // Redirect to community after login
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(AppView.LOGIN);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LOGIN:
        return <Login onLogin={handleLogin} />;
      case AppView.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case AppView.URL_SCANNER:
        return (
          <ScannerView 
            type="URL" 
            title="Malicious URL Scanner" 
            description="Detect phishing links, malware distribution sites, and suspicious domains using AI heuristics."
            placeholder="https://example.com/suspicious-path"
          />
        );
      case AppView.EMAIL_SCANNER:
        return (
          <ScannerView 
            type="EMAIL" 
            title="Email Spam & Phishing Detector" 
            description="Analyze email headers and body text for social engineering, spam patterns, and malicious intent."
            placeholder="Paste raw email content here..."
          />
        );
      case AppView.COMMUNITY:
        return <Community user={user} />;
      case AppView.CODE_SCANNER:
        return (
          <ScannerView 
            type="CODE" 
            title="Vulnerability Code Scanner" 
            description="Static analysis of code snippets to identify potential security flaws like SQL Injection or XSS."
            placeholder="def login(user): query = 'SELECT * FROM users WHERE name=' + user..."
          />
        );
      case AppView.PASSWORD_CHECKER:
        return (
          <ScannerView 
            type="PASSWORD" 
            title="Password Strength Audit" 
            description="Evaluate password entropy and resistance to brute-force or dictionary attacks."
            placeholder="Enter password to test..."
          />
        );
      case AppView.EDUCATION:
        return <Education />;
      case AppView.DEPLOY_GUIDE:
        return <DeployGuide />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setView={setCurrentView} 
      user={user} 
      onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
