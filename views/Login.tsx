
import React, { useState } from 'react';
import { Terminal, Lock, User, ArrowRight, UserPlus, AlertCircle } from 'lucide-react';
import { authService } from '../services/authService';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isRegistering) {
        // Handle Registration
        const result = await authService.register(username, password);
        if (result.success) {
          setSuccessMsg('Account created successfully! Logging you in...');
          setTimeout(() => {
            onLogin(username);
          }, 1000);
        } else {
          setError(result.message);
        }
      } else {
        // Handle Login
        const result = await authService.login(username, password);
        if (result.success) {
          onLogin(username);
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError("An unexpected system error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError(null);
    setSuccessMsg(null);
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] animate-fadeIn px-4">
      <div className="w-full max-w-md">
        <div className="bg-cyber-dark border border-gray-800 rounded-xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 border border-cyber-neon mb-4 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
              <Terminal size={32} className="text-cyber-neon" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {isRegistering ? 'NEW AGENT' : 'SYSTEM ACCESS'}
            </h1>
            <p className="text-gray-500 font-mono text-sm">
              {isRegistering ? 'CREATE YOUR CREDENTIALS' : 'AUTHENTICATION REQUIRED'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error / Success Messages */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-3 rounded text-sm flex items-center">
                <AlertCircle size={16} className="mr-2" />
                {error}
              </div>
            )}
            {successMsg && (
              <div className="bg-green-900/20 border border-cyber-neon/50 text-cyber-neon p-3 rounded text-sm flex items-center">
                <Terminal size={16} className="mr-2" />
                {successMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-cyber-neon mb-2 uppercase">Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none transition-all font-mono"
                  placeholder="Enter Username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-cyber-neon mb-2 uppercase">Passcode</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:border-cyber-neon focus:ring-1 focus:ring-cyber-neon outline-none transition-all font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className={`w-full group relative flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black transition-all duration-200
                ${isLoading ? 'bg-gray-600 cursor-wait' : 'bg-cyber-neon hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]'}
              `}
            >
              {isLoading ? (
                <span className="font-mono">PROCESSING...</span>
              ) : (
                <span className="flex items-center font-bold tracking-wider">
                  {isRegistering ? 'ESTABLISH IDENTITY' : 'INITIALIZE SESSION'} 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </span>
              )}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
             <button 
                onClick={toggleMode}
                className="text-sm text-gray-400 hover:text-cyber-neon transition-colors flex items-center justify-center w-full"
             >
                {isRegistering ? (
                  <>Already have an ID? <span className="font-bold ml-1 text-white">Log In</span></>
                ) : (
                  <>Need access? <span className="font-bold ml-1 text-white flex items-center"><UserPlus size={14} className="mr-1" /> Register New Agent</span></>
                )}
             </button>
          </div>
          
          <div className="mt-4 text-center">
             <p className="text-[10px] text-gray-600 font-mono">SECURE DATABASE :: LOCAL_ENCRYPTION</p>
          </div>
        </div>
      </div>
    </div>
  );
};
