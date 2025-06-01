
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

interface MenuItemDB {
  id?: number;
  name_uz: string;
  name_en: string;
  name_ru: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  is_active: boolean;
}

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItemDB[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItemDB | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setMenuItems(data);
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Menyu elementlarini yuklashda xatolik",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (item: MenuItemDB) => {
    try {
      if (item.id) {
        const { error } = await supabase
          .from('menu_items')
          .update(item)
          .eq('id', item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('menu_items')
          .insert(item);
        if (error) throw error;
      }

      toast({
        title: "Muvaffaqiyat",
        description: "Menyu elementi saqlandi"
      });

      loadMenuItems();
      setEditingItem(null);
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Saqlashda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Muvaffaqiyat",
        description: "Menyu elementi o'chirildi"
      });

      loadMenuItems();
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "O'chirishda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  };

  const newItem: MenuItemDB = {
    name_uz: '',
    name_en: '',
    name_ru: '',
    description_uz: '',
    description_en: '',
    description_ru: '',
    price: 0,
    category: 'main',
    image: '/placeholder.svg',
    rating: 4.5,
    is_active: true,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Menyu boshqaruvi</h1>
        <Button onClick={() => setEditingItem(newItem)} className="bg-yellow-600 hover:bg-yellow-700">
          <Plus className="w-4 h-4 mr-2" />
          Yangi element
        </Button>
      </div>

      {editingItem && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">
              {editingItem.id ? 'Tahrirlash' : 'Yangi element qo\'shish'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Nomi (O'zbekcha)</Label>
                <Input
                  value={editingItem.name_uz}
                  onChange={(e) => setEditingItem({...editingItem, name_uz: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Name (English)</Label>
                <Input
                  value={editingItem.name_en}
                  onChange={(e) => setEditingItem({...editingItem, name_en: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Название (Русский)</Label>
                <Input
                  value={editingItem.name_ru}
                  onChange={(e) => setEditingItem({...editingItem, name_ru: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Tavsif (O'zbekcha)</Label>
                <Textarea
                  value={editingItem.description_uz}
                  onChange={(e) => setEditingItem({...editingItem, description_uz: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description (English)</Label>
                <Textarea
                  value={editingItem.description_en}
                  onChange={(e) => setEditingItem({...editingItem, description_en: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Описание (Русский)</Label>
                <Textarea
                  value={editingItem.description_ru}
                  onChange={(e) => setEditingItem({...editingItem, description_ru: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-gray-300">Narx</Label>
                <Input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Kategoriya</Label>
                <Input
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Reyting</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={editingItem.rating}
                  onChange={(e) => setEditingItem({...editingItem, rating: Number(e.target.value)})}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label className="text-gray-300">Faol</Label>
                <Switch
                  checked={editingItem.is_active}
                  onCheckedChange={(checked) => setEditingItem({...editingItem, is_active: checked})}
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Rasm URL</Label>
              <Input
                value={editingItem.image}
                onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleSave(editingItem)} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Saqlash
              </Button>
              <Button onClick={() => setEditingItem(null)} variant="outline">
                Bekor qilish
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="glass-card">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{item.name_uz} / {item.name_en} / {item.name_ru}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.description_uz}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-yellow-400 font-bold">${item.price}</span>
                    <span className="text-gray-400">{item.category}</span>
                    <span className="text-gray-400">⭐ {item.rating}</span>
                    <span className={`text-sm ${item.is_active ? 'text-green-400' : 'text-red-400'}`}>
                      {item.is_active ? 'Faol' : 'Nofaol'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setEditingItem(item)} className="bg-blue-600 hover:bg-blue-700">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => item.id && handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
