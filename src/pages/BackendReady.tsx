
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import DataSync from '@/components/BackendReady/DataSync';
import APIDocumentation from '@/components/BackendReady/APIDocumentation';
import { useAuth } from '@/hooks/useAuth';
import { Server, Code, Database, Shield } from 'lucide-react';

const BackendReady: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Backend Ready
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Sayt backend yozish uchun to'liq tayyor. Node.js + MongoDB + Express.js bilan ishlash uchun barcha ma'lumotlar va API endpoints tayyorlandi.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 text-center">
              <Server className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">API Ready</h3>
              <p className="text-sm text-gray-400">REST API endpoints tayyor</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <Database className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">MongoDB Schema</h3>
              <p className="text-sm text-gray-400">Ma'lumotlar bazasi sxemasi tayyor</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <Code className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">TypeScript Types</h3>
              <p className="text-sm text-gray-400">Type definitions tayyor</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Authentication</h3>
              <p className="text-sm text-gray-400">Auth sistem tayyor</p>
            </div>
          </div>

          {/* Data Sync Component */}
          {user && (
            <div className="mb-12">
              <DataSync />
            </div>
          )}

          {/* API Documentation */}
          <APIDocumentation />

          {/* Backend Setup Guide */}
          <div className="mt-12 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Backend O'rnatish Qo'llanmasi</h2>
            
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Node.js loyihasi yaratish</h3>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm">
                  <p>mkdir everest-rest-backend</p>
                  <p>cd everest-rest-backend</p>
                  <p>npm init -y</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Kerakli paketlarni o'rnatish</h3>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm">
                  <p>npm install express mongoose bcryptjs jsonwebtoken cors dotenv</p>
                  <p>npm install -D nodemon @types/node typescript</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Environment Variables</h3>
                <div className="bg-slate-900 p-3 rounded font-mono text-sm">
                  <p>MONGODB_URI=mongodb://localhost:27017/everest-rest</p>
                  <p>JWT_SECRET=your-secret-key</p>
                  <p>PORT=5000</p>
                  <p>NODE_ENV=development</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">4. Frontend bilan bog'lanish</h3>
                <p className="text-gray-400">
                  Frontend CORS sozlamalarini o'rnating va API_BASE_URL ni backend portiga yo'naltiring.
                  Barcha ma'lumotlar types/backend.ts faylida aniqlangan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BackendReady;
