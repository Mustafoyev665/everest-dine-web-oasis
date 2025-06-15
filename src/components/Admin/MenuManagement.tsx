import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Save, X, Eye, EyeOff } from 'lucide-react';
import SeedDataButton from './SeedDataButton';

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

const categories = [
  { value: 'main', label: 'Asosiy ovqatlar' },
  { value: 'desserts', label: 'Shirinliklar' },
  { value: 'beverages', label: 'Ichimliklar' },
  { value: 'breakfast', label: 'Nonushta' },
  { value: 'snacks', label: 'Gazaklar' },
  { value: 'soups', label: 'Sho\'rvalar' },
  { value: 'salads', label: 'Salatlar' },
  { value: 'appetizers', label: 'Salqin ovqatlar' }
];

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItemDB[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItemDB | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setMenuItems(data);
    } catch (error) {
      console.error('Error loading menu items:', error);
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
      setSaving(true);

      // Validation
      if (!item.name_uz || !item.name_en || !item.price || !item.category) {
        toast({
          title: "Xatolik",
          description: "Barcha majburiy maydonlarni to'ldiring",
          variant: "destructive"
        });
        return;
      }

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
        description: item.id ? "Mahsulot yangilandi" : "Yangi mahsulot qo'shildi"
      });

      loadMenuItems();
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      toast({
        title: "Xatolik",
        description: "Saqlashda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bu mahsulotni o'chirmoqchimisiz?")) return;

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Muvaffaqiyat",
        description: "Mahsulot o'chirildi"
      });

      loadMenuItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Xatolik",
        description: "O'chirishda xatolik yuz berdi",
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Muvaffaqiyat",
        description: `Mahsulot ${!currentStatus ? 'faollashtirildi' : 'nofaol qilindi'}`
      });

      loadMenuItems();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast({
        title: "Xatolik",
        description: "Statusni o'zgartirishda xatolik",
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

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name_uz.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.name_en.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Menyu boshqaruvi</h1>
        <Button onClick={() => setEditingItem(newItem)} className="bg-yellow-600 hover:bg-yellow-700">
          <Plus className="w-4 h-4 mr-2" />
          Yangi mahsulot
        </Button>
      </div>

      {/* Seed Data Button */}
      <SeedDataButton />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Mahsulot nomini qidiring..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Kategoriya" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barcha kategoriyalar</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Editing Form */}
      {editingItem && (
        <Card className="glass-card border-yellow-400/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">
                {editingItem.id ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Nomi (O'zbekcha) *</Label>
                <Input
                  value={editingItem.name_uz}
                  onChange={(e) => setEditingItem({...editingItem, name_uz: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Mahsulot nomi"
                />
              </div>
              <div>
                <Label className="text-gray-300">Name (English) *</Label>
                <Input
                  value={editingItem.name_en}
                  onChange={(e) => setEditingItem({...editingItem, name_en: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label className="text-gray-300">Название (Русский)</Label>
                <Input
                  value={editingItem.name_ru}
                  onChange={(e) => setEditingItem({...editingItem, name_ru: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Название продукта"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Tavsif (O'zbekcha)</Label>
                <Textarea
                  value={editingItem.description_uz}
                  onChange={(e) => setEditingItem({...editingItem, description_uz: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Mahsulot tavsifi"
                />
              </div>
              <div>
                <Label className="text-gray-300">Description (English)</Label>
                <Textarea
                  value={editingItem.description_en}
                  onChange={(e) => setEditingItem({...editingItem, description_en: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Product description"
                />
              </div>
              <div>
                <Label className="text-gray-300">Описание (Русский)</Label>
                <Textarea
                  value={editingItem.description_ru}
                  onChange={(e) => setEditingItem({...editingItem, description_ru: e.target.value})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Описание продукта"
                />
              </div>
            </div>

            {/* Price, Category, Rating */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-gray-300">Narx ($) *</Label>
                <Input
                  type="number"
                  step="0.50"
                  min="0"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({...editingItem, price: Number(e.target.value)})}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label className="text-gray-300">Kategoriya *</Label>
                <Select value={editingItem.category} onValueChange={(value) => setEditingItem({...editingItem, category: value})}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="flex items-center space-x-2 pt-6">
                <Switch
                  checked={editingItem.is_active}
                  onCheckedChange={(checked) => setEditingItem({...editingItem, is_active: checked})}
                />
                <Label className="text-gray-300">Faol</Label>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <Label className="text-gray-300">Rasm URL</Label>
              <Input
                value={editingItem.image}
                onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                className="bg-white/5 border-white/10 text-white"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={() => handleSave(editingItem)} 
                className="bg-green-600 hover:bg-green-700"
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </Button>
              <Button onClick={() => setEditingItem(null)} variant="outline">
                Bekor qilish
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      <div className="space-y-4">
        <div className="text-gray-400 text-sm">
          Jami: {filteredItems.length} ta mahsulot
        </div>
        
        {filteredItems.map((item) => (
          <Card key={item.id} className={`glass-card transition-all hover:border-yellow-400/30 ${!item.is_active ? 'opacity-60' : ''}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold text-lg truncate">
                      {item.name_uz}
                    </h3>
                    {!item.is_active && (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                        Nofaol
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {item.description_uz || 'Tavsif mavjud emas'}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="text-yellow-400 font-bold text-lg">
                      ${Number(item.price).toFixed(2)}
                    </span>
                    <span className="text-gray-400 bg-white/5 px-2 py-1 rounded">
                      {categories.find(c => c.value === item.category)?.label || item.category}
                    </span>
                    <span className="text-gray-400">
                      ⭐ {item.rating}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleActive(item.id!, item.is_active)}
                    className="text-gray-400 hover:text-white"
                  >
                    {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setEditingItem(item)} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => item.id && handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredItems.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400">Hech qanday mahsulot topilmadi</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;
