
import React from 'react';
import { Rocket, Github, Globe, ExternalLink, Terminal, ShieldCheck, Key } from 'lucide-react';

export const DeployGuide: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center">
          <Rocket className="mr-3 text-cyber-neon" />
          Deployment Protocols
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Instructions for hosting ScamShield on production-grade infrastructure without using GCP.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Vercel / Netlify Section */}
        <div className="bg-cyber-dark border border-gray-800 rounded-xl p-6 hover:border-cyber-blue/50 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black rounded border border-gray-700">
                <Globe className="text-cyber-blue" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Vercel & Netlify</h3>
            </div>
            <span className="text-[10px] font-mono bg-cyber-blue/10 text-cyber-blue px-2 py-1 rounded border border-cyber-blue/20 uppercase">Recommended</span>
          </div>

          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            The easiest way to deploy modern React apps. Both platforms offer free tiers, global CDNs, and automatic SSL.
          </p>

          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded border border-gray-800">
              <div className="text-xs font-mono text-cyber-neon mb-2">STEP_01: SOURCE_CONTROL</div>
              <p className="text-gray-500 text-xs mb-3">Push your code to a GitHub, GitLab, or Bitbucket repository.</p>
              <div className="flex items-center space-x-2 text-gray-300 font-mono text-xs bg-gray-900 p-2 rounded">
                <Terminal size={12} />
                <span>git push origin main</span>
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded border border-gray-800">
              <div className="text-xs font-mono text-cyber-neon mb-2">STEP_02: CONNECT_PLATFORM</div>
              <p className="text-gray-500 text-xs">Login to <a href="https://vercel.com" target="_blank" className="text-cyber-blue underline">Vercel</a> or <a href="https://netlify.com" target="_blank" className="text-cyber-blue underline">Netlify</a> and select "New Project". Choose your repository.</p>
            </div>

            <div className="bg-black/50 p-4 rounded border border-cyber-alert/30">
              <div className="text-xs font-mono text-cyber-alert mb-2 flex items-center">
                <Key size={12} className="mr-2" />
                CRITICAL_STEP: ENVIRONMENT_VARIABLES
              </div>
              <p className="text-gray-400 text-xs mb-2">To make the AI scanners work, you MUST add your API Key in the platform dashboard settings:</p>
              <div className="bg-gray-900 p-2 rounded font-mono text-[10px] text-white">
                Variable Name: <span className="text-cyber-neon">API_KEY</span><br/>
                Value: <span className="text-gray-500">[Your Gemini API Key]</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Pages Section */}
        <div className="bg-cyber-dark border border-gray-800 rounded-xl p-6 hover:border-cyber-neon/50 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black rounded border border-gray-700">
                <Github className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">GitHub Pages</h3>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            Perfect if you are already hosting your code on GitHub. Requires the <code className="text-cyber-neon">gh-pages</code> package.
          </p>

          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded border border-gray-800">
              <div className="text-xs font-mono text-cyber-neon mb-2">STEP_01: INSTALL_HELPER</div>
              <div className="flex items-center space-x-2 text-gray-300 font-mono text-xs bg-gray-900 p-2 rounded">
                <Terminal size={12} />
                <span>npm install gh-pages --save-dev</span>
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded border border-gray-800">
              <div className="text-xs font-mono text-cyber-neon mb-2">STEP_02: UPDATE_PACKAGE_JSON</div>
              <p className="text-gray-500 text-xs mb-2">Add these scripts to your <code className="text-gray-400">package.json</code>:</p>
              <div className="bg-gray-900 p-2 rounded font-mono text-[10px] text-gray-300">
                "predeploy": "npm run build",<br/>
                "deploy": "gh-pages -d dist"
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded border border-gray-800">
              <div className="text-xs font-mono text-cyber-neon mb-2">STEP_03: EXECUTE_DEPLOY</div>
              <div className="flex items-center space-x-2 text-gray-300 font-mono text-xs bg-gray-900 p-2 rounded">
                <Terminal size={12} />
                <span>npm run deploy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* General Advice */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-cyber-neon/10 rounded-full">
          <ShieldCheck className="text-cyber-neon" size={48} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-2">Security Best Practice</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Never hardcode your <span className="text-white font-mono">API_KEY</span> directly in your files if you plan to share your code on GitHub. 
            Always use a <span className="text-cyber-blue font-mono">.env</span> file for local development and the 
            <span className="text-cyber-blue font-mono">Environment Variables</span> section of your hosting provider for production. 
            This prevents hackers from stealing your AI credits.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <a 
          href="https://vitejs.dev/guide/static-deploy.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-500 hover:text-cyber-neon transition-colors text-sm font-mono"
        >
          <span>VIEW_FULL_VITE_DEPLOY_DOCS</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};
