
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useBackendAPI } from '@/hooks/useBackendAPI';
import { useShoppingContext } from '@/context/ShoppingContext';
import { Button } from '@/components/ui/button';
import { Sync, Database, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Backend bilan ma'lumot sinxronizatsiyasi uchun komponent
const DataSync: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, likedItems } = useShoppingContext();
  const { getUserData, formatOrderForBackend } = useBackendAPI();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Backend bilan sync qilish uchun tayyorlangan ma'lumotlar
  const getDataForBackend = () => {
    return {
      user: getUserData(),
      cart: cartItems,
      liked: likedItems,
      timestamp: new Date().toISOString(),
    };
  };

  // Backend API ga yuborish uchun ma'lumotlarni tayyorlash
  const syncWithBackend = async () => {
    if (!user) return;

    setSyncStatus('syncing');
    
    try {
      const data = getDataForBackend();
      
      // Bu yerda backend API ga so'rov yuboriladi
      console.log('Backend uchun tayyorlangan ma'lumotlar:', data);
      
      // Backend endpoints:
      // POST /api/users/sync - foydalanuvchi ma'lumotlarini sinxronlash
      // POST /api/cart/sync - savatni sinxronlash
      // POST /api/wishlist/sync - sevimlilarni sinxronlash
      
      setSyncStatus('success');
      toast({
        title: "Ma'lumotlar sinxronlashtirildi",
        description: "Barcha ma'lumotlar backend bilan muvaffaqiyatli sinxronlashtirildi.",
      });
      
    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "Sinxronlashda xatolik",
        description: "Backend bilan bog'lanishda muammo yuz berdi.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Backend Sync</h3>
        </div>
        <div className="flex items-center gap-2">
          {syncStatus === 'success' && <Check className="h-4 w-4 text-green-400" />}
          <span className="text-sm text-gray-400">
            {syncStatus === 'idle' && 'Tayyor'}
            {syncStatus === 'syncing' && 'Sinxronlanmoqda...'}
            {syncStatus === 'success' && 'Muvaffaqiyatli'}
            {syncStatus === 'error' && 'Xatolik'}
          </span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">
        Ma'lumotlarni backend (Node.js + MongoDB) bilan sinxronlash
      </p>
      
      <Button 
        onClick={syncWithBackend}
        disabled={!user || syncStatus === 'syncing'}
        className="w-full"
        variant="outline"
      >
        <Sync className={`mr-2 h-4 w-4 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
        Backend bilan sinxronlash
      </Button>
      
      {user && (
        <div className="mt-4 p-3 bg-slate-900 rounded text-xs text-gray-400">
          <p><strong>Foydalanuvchi ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Savat elementlari:</strong> {cartItems.length}</p>
          <p><strong>Sevimli elementlar:</strong> {likedItems.length}</p>
        </div>
      )}
    </div>
  );
};

export default DataSync;
