
import React from 'react';
import { Code, Server, Database } from 'lucide-react';

// Backend API dokumentatsiyasi komponenti
const APIDocumentation: React.FC = () => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <div className="flex items-center gap-2 mb-6">
        <Server className="h-6 w-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">Backend API Dokumentatsiyasi</h2>
      </div>

      <div className="space-y-6">
        {/* Authentication Endpoints */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Code className="h-4 w-4" />
            Authentication API
          </h3>
          <div className="bg-slate-900 p-4 rounded text-sm font-mono">
            <div className="space-y-2 text-gray-300">
              <p><span className="text-green-400">POST</span> /api/auth/register</p>
              <p><span className="text-blue-400">POST</span> /api/auth/login</p>
              <p><span className="text-red-400">POST</span> /api/auth/logout</p>
              <p><span className="text-yellow-400">GET</span> /api/auth/profile</p>
            </div>
          </div>
        </div>

        {/* Users Endpoints */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Users API</h3>
          <div className="bg-slate-900 p-4 rounded text-sm font-mono">
            <div className="space-y-2 text-gray-300">
              <p><span className="text-yellow-400">GET</span> /api/users</p>
              <p><span className="text-yellow-400">GET</span> /api/users/:id</p>
              <p><span className="text-blue-400">PUT</span> /api/users/:id</p>
              <p><span className="text-green-400">POST</span> /api/users/sync</p>
            </div>
          </div>
        </div>

        {/* Orders Endpoints */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Orders API</h3>
          <div className="bg-slate-900 p-4 rounded text-sm font-mono">
            <div className="space-y-2 text-gray-300">
              <p><span className="text-green-400">POST</span> /api/orders</p>
              <p><span className="text-yellow-400">GET</span> /api/orders</p>
              <p><span className="text-yellow-400">GET</span> /api/orders/:id</p>
              <p><span className="text-yellow-400">GET</span> /api/orders/user/:userId</p>
              <p><span className="text-blue-400">PUT</span> /api/orders/:id/status</p>
            </div>
          </div>
        </div>

        {/* Reservations Endpoints */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Reservations API</h3>
          <div className="bg-slate-900 p-4 rounded text-sm font-mono">
            <div className="space-y-2 text-gray-300">
              <p><span className="text-green-400">POST</span> /api/reservations</p>
              <p><span className="text-yellow-400">GET</span> /api/reservations</p>
              <p><span className="text-yellow-400">GET</span> /api/reservations/:id</p>
              <p><span className="text-blue-400">PUT</span> /api/reservations/:id/status</p>
            </div>
          </div>
        </div>

        {/* Menu Endpoints */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Menu API</h3>
          <div className="bg-slate-900 p-4 rounded text-sm font-mono">
            <div className="space-y-2 text-gray-300">
              <p><span className="text-yellow-400">GET</span> /api/menu</p>
              <p><span className="text-yellow-400">GET</span> /api/menu/categories</p>
              <p><span className="text-green-400">POST</span> /api/menu</p>
              <p><span className="text-blue-400">PUT</span> /api/menu/:id</p>
              <p><span className="text-red-400">DELETE</span> /api/menu/:id</p>
            </div>
          </div>
        </div>

        {/* Admin Endpoints */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Admin API</h3>
          <div className="bg-slate-900 p-4 rounded text-sm font-mono">
            <div className="space-y-2 text-gray-300">
              <p><span className="text-yellow-400">GET</span> /api/admin/analytics</p>
              <p><span className="text-yellow-400">GET</span> /api/admin/orders</p>
              <p><span className="text-yellow-400">GET</span> /api/admin/reservations</p>
              <p><span className="text-yellow-400">GET</span> /api/admin/messages</p>
              <p><span className="text-yellow-400">GET</span> /api/admin/revenue</p>
            </div>
          </div>
        </div>

        {/* Database Schema */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Database className="h-4 w-4" />
            MongoDB Schema
          </h3>
          <div className="bg-slate-900 p-4 rounded text-sm">
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-yellow-400">users:</strong> _id, email, fullName, phone, address, isAdmin, createdAt, updatedAt</p>
              <p><strong className="text-yellow-400">orders:</strong> _id, userId, orderNumber, items[], totalAmount, status, customerInfo, deliveryInfo, paymentMethod, createdAt</p>
              <p><strong className="text-yellow-400">reservations:</strong> _id, userId, reservationNumber, guestName, guestPhone, guestEmail, date, time, guests, status, createdAt</p>
              <p><strong className="text-yellow-400">menu:</strong> _id, name, description, price, category, image, isAvailable, ingredients[], allergens[], createdAt</p>
              <p><strong className="text-yellow-400">contacts:</strong> _id, userId, name, email, phone, message, status, adminReply, createdAt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;
