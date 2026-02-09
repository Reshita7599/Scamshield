
import React from 'react';
import { Shield, Search, Mail, Users, FileCode, Lock, GraduationCap, Menu, X, Terminal, LogIn, LogOut, Rocket } from 'lucide-react';
import { AppView, User } from '../types';

interface LayoutProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: Shield },
    { id: AppView.URL_SCANNER, label: 'URL Scanner', icon: Search },
    { id: AppView.EMAIL_SCANNER, label: 'Email Detector', icon: Mail },
    { id: AppView.COMMUNITY, label: 'Community', icon: Users },
    { id: AppView.CODE_SCANNER, label: 'Code Scanner', icon: FileCode },
    { id: AppView.PASSWORD_CHECKER, label: 'Password Audit', icon: Lock },
    { id: AppView.EDUCATION, label: 'Education Hub', icon: GraduationCap },
    { id: AppView.DEPLOY_GUIDE, label: 'Deploy Guide', icon: Rocket },
  ];

  return (
    <div className="min-h-screen flex bg-cyber-black text-gray-300 font-sans selection:bg-cyber-neon selection:text-black">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-cyber-dark border-b border-gray-800 z-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-cyber-neon">
          <Terminal size={24} />
          <span className="font-bold font-mono tracking-tighter text-xl">SCAMSHIELD</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-cyber-dark border-r border-gray-800 transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:block
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 hidden lg:flex items-center space-x-2 text-cyber-neon border-b border-gray-800">
            <Terminal size={28} />
            <span className="font-bold font-mono tracking-tighter text-xl">SCAMSHIELD</span>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-800 bg-gray-900/50">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-cyber-neon/20 border border-cyber-neon text-cyber-neon flex items-center justify-center font-bold font-mono">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user.username}</p>
                  <p className="text-xs text-cyber-blue">Verified Agent</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-1.5 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setView(AppView.LOGIN)}
                className="w-full flex items-center justify-center space-x-2 bg-cyber-gray hover:bg-gray-800 border border-gray-700 text-gray-300 py-2 rounded transition-all"
              >
                <LogIn size={16} />
                <span className="text-sm font-bold">LOGIN ACCESS</span>
              </button>
            )}
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                  ${currentView === item.id 
                    ? 'bg-cyber-gray text-cyber-neon border border-gray-700 shadow-[0_0_15px_rgba(0,255,65,0.1)]' 
                    : 'hover:bg-gray-900 hover:text-white'
                  }`}
              >
                <item.icon size={20} className={`transition-colors ${currentView === item.id ? 'text-cyber-neon' : 'text-gray-500 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="bg-gray-900 rounded-lg p-3 text-xs text-gray-500 border border-gray-800">
              <p className="mb-1 text-cyber-blue font-mono">STATUS: ONLINE</p>
              <p>v2.5.0-flash</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 p-4 lg:p-8 overflow-y-auto h-screen scrollbar-hide">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
