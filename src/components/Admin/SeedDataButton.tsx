
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { insertSeedData } from '@/data/seedMenuItems';
import { toast } from '@/hooks/use-toast';
import { Plus, Database } from 'lucide-react';

const SeedDataButton = () => {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedData = async () => {
    if (!confirm('40 ta yangi mahsulot qo\'shiladi. Davom etasizmi?')) {
      return;
    }

    try {
      setIsSeeding(true);
      await insertSeedData();
      
      toast({
        title: "Muvaffaqiyat",
        description: "40 ta yangi mahsulot qo'shildi!"
      });
      
      // Reload the page to see new items
      window.location.reload();
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: "Xatolik",
        description: "Ma'lumotlarni qo'shishda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card className="glass-card border-green-400/20 mb-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Database className="w-5 h-5" />
          Demo ma'lumotlar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">
          Menyuga 40 ta namunaviy mahsulot qo'shing (asosiy ovqatlar, shirinliklar, ichimliklar va salqin ovqatlar).
        </p>
        <Button 
          onClick={handleSeedData}
          disabled={isSeeding}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {isSeeding ? '40 ta mahsulot qo\'shilmoqda...' : '40 ta mahsulot qo\'shish'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SeedDataButton;
