
import React, { useState } from 'react';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useShoppingContext } from '@/context/ShoppingContext';

// Menu categories
const categories = [
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'sides', name: 'Side Dishes' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'salads', name: 'Salads' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'steaks', name: 'Steaks' },
];

// Expanded menu items with 100+ products
const menuItems = [
  // Appetizers (15 items)
  {
    id: 1,
    name: 'Truffled Mushroom Bruschetta',
    description: 'Artisanal sourdough toasts topped with wild mushrooms, black truffle, and aged parmesan',
    price: 18,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Sourdough bread', 'Wild mushrooms', 'Black truffle', 'Aged parmesan', 'Microgreens']
  },
  {
    id: 2,
    name: 'Seared Sea Scallops',
    description: 'Hand-dived scallops with cauliflower purée, golden raisins, and pine nut dressing',
    price: 24,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Sea scallops', 'Cauliflower purée', 'Golden raisins', 'Pine nuts', 'Micro herbs']
  },
  {
    id: 3,
    name: 'Crispy Calamari',
    description: 'Golden fried squid rings with spicy marinara and lemon aioli',
    price: 16,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Fresh squid', 'Marinara sauce', 'Lemon aioli', 'Herbs']
  },
  {
    id: 4,
    name: 'Cheese Platter Deluxe',
    description: 'Selection of artisanal cheeses with nuts, honey, and fresh fruits',
    price: 22,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Artisanal cheeses', 'Mixed nuts', 'Honey', 'Fresh fruits']
  },
  {
    id: 5,
    name: 'Oysters Rockefeller',
    description: 'Fresh oysters baked with spinach, herbs, and hollandaise sauce',
    price: 28,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Fresh oysters', 'Spinach', 'Herbs', 'Hollandaise']
  },
  {
    id: 6,
    name: 'Beef Carpaccio',
    description: 'Thinly sliced raw beef with arugula, capers, and parmesan',
    price: 26,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Premium beef', 'Arugula', 'Capers', 'Parmesan', 'Olive oil']
  },
  {
    id: 7,
    name: 'Lobster Bisque',
    description: 'Rich and creamy lobster soup with cognac and fresh herbs',
    price: 20,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Fresh lobster', 'Cream', 'Cognac', 'Herbs']
  },
  {
    id: 8,
    name: 'Foie Gras Terrine',
    description: 'Classic French foie gras with toasted brioche and fig compote',
    price: 35,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Foie gras', 'Brioche', 'Fig compote', 'Microgreens']
  },
  {
    id: 9,
    name: 'Tuna Tartare',
    description: 'Fresh yellowfin tuna with avocado, cucumber, and sesame oil',
    price: 24,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Yellowfin tuna', 'Avocado', 'Cucumber', 'Sesame oil']
  },
  {
    id: 10,
    name: 'Stuffed Mushrooms',
    description: 'Large mushroom caps filled with crab meat and herbs',
    price: 18,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Large mushrooms', 'Crab meat', 'Herbs', 'Cheese']
  },
  {
    id: 11,
    name: 'Escargot Bourguignon',
    description: 'Classic French snails in garlic and parsley butter',
    price: 22,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Escargot', 'Garlic butter', 'Parsley', 'White wine']
  },
  {
    id: 12,
    name: 'Antipasto Platter',
    description: 'Italian cured meats, cheeses, olives, and marinated vegetables',
    price: 28,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Cured meats', 'Italian cheeses', 'Olives', 'Marinated vegetables']
  },
  {
    id: 13,
    name: 'Shrimp Cocktail',
    description: 'Jumbo shrimp served with cocktail sauce and lemon',
    price: 19,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Jumbo shrimp', 'Cocktail sauce', 'Lemon', 'Lettuce']
  },
  {
    id: 14,
    name: 'Buffalo Wings',
    description: 'Crispy chicken wings tossed in spicy buffalo sauce',
    price: 16,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Chicken wings', 'Buffalo sauce', 'Celery', 'Blue cheese']
  },
  {
    id: 15,
    name: 'Deviled Eggs',
    description: 'Classic deviled eggs with paprika and fresh chives',
    price: 12,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Eggs', 'Mayonnaise', 'Paprika', 'Chives']
  },

  // Main Courses (25 items)
  {
    id: 16,
    name: 'Slow-cooked Lamb Shoulder',
    description: 'Tender lamb shoulder with roasted root vegetables, red wine jus, and mint gremolata',
    price: 38,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Lamb shoulder', 'Root vegetables', 'Red wine jus', 'Mint gremolata']
  },
  {
    id: 17,
    name: 'Pan-seared Sea Bass',
    description: 'Wild sea bass with saffron risotto, charred asparagus, and citrus butter sauce',
    price: 42,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Sea bass', 'Saffron risotto', 'Asparagus', 'Citrus butter']
  },
  {
    id: 18,
    name: 'Mushroom & Truffle Risotto',
    description: 'Creamy arborio rice with wild mushrooms, black truffle, and aged parmesan',
    price: 32,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Arborio rice', 'Wild mushrooms', 'Black truffle', 'Aged parmesan', 'Vegetable stock']
  },
  {
    id: 19,
    name: 'Grilled Ribeye Steak',
    description: 'Prime ribeye steak with garlic mashed potatoes and grilled vegetables',
    price: 55,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Prime ribeye', 'Garlic mashed potatoes', 'Grilled vegetables']
  },
  {
    id: 20,
    name: 'Lobster Thermidor',
    description: 'Whole lobster in creamy cheese sauce, baked to perfection',
    price: 68,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Fresh lobster', 'Cheese sauce', 'Herbs', 'Butter']
  },
  {
    id: 21,
    name: 'Duck Confit',
    description: 'Slow-cooked duck leg with orange glaze and roasted root vegetables',
    price: 45,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Duck leg', 'Orange glaze', 'Root vegetables', 'Herbs']
  },
  {
    id: 22,
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast with marinara sauce and melted mozzarella',
    price: 28,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Chicken breast', 'Marinara sauce', 'Mozzarella', 'Breadcrumbs']
  },
  {
    id: 23,
    name: 'Veal Osso Buco',
    description: 'Braised veal shank with saffron risotto and gremolata',
    price: 52,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Veal shank', 'Saffron risotto', 'Gremolata', 'Wine']
  },
  {
    id: 24,
    name: 'Salmon Wellington',
    description: 'Fresh salmon wrapped in puff pastry with spinach and herbs',
    price: 38,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Fresh salmon', 'Puff pastry', 'Spinach', 'Herbs']
  },
  {
    id: 25,
    name: 'Beef Tenderloin',
    description: 'Premium beef tenderloin with red wine reduction and seasonal vegetables',
    price: 58,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Beef tenderloin', 'Red wine reduction', 'Seasonal vegetables']
  },
  {
    id: 26,
    name: 'Roasted Chicken',
    description: 'Herb-roasted whole chicken with lemon and rosemary',
    price: 32,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Whole chicken', 'Herbs', 'Lemon', 'Rosemary']
  },
  {
    id: 27,
    name: 'Pork Tenderloin',
    description: 'Pan-seared pork tenderloin with apple chutney and roasted potatoes',
    price: 35,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Pork tenderloin', 'Apple chutney', 'Roasted potatoes']
  },
  {
    id: 28,
    name: 'Fish and Chips',
    description: 'Beer-battered cod with crispy fries and mushy peas',
    price: 24,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Fresh cod', 'Beer batter', 'Fries', 'Mushy peas']
  },
  {
    id: 29,
    name: 'Vegetarian Lasagna',
    description: 'Layers of pasta with ricotta, spinach, and marinara sauce',
    price: 26,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Pasta', 'Ricotta', 'Spinach', 'Marinara sauce']
  },
  {
    id: 30,
    name: 'Rack of Lamb',
    description: 'Herb-crusted rack of lamb with mint sauce and roasted vegetables',
    price: 48,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Rack of lamb', 'Herb crust', 'Mint sauce', 'Vegetables']
  },
  {
    id: 31,
    name: 'Paella Valenciana',
    description: 'Traditional Spanish rice dish with chicken, rabbit, and vegetables',
    price: 42,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Bomba rice', 'Chicken', 'Rabbit', 'Saffron', 'Vegetables']
  },
  {
    id: 32,
    name: 'Beef Bourguignon',
    description: 'Classic French beef stew with red wine and pearl onions',
    price: 36,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Beef chuck', 'Red wine', 'Pearl onions', 'Mushrooms']
  },
  {
    id: 33,
    name: 'Coq au Vin',
    description: 'Braised chicken in white wine with mushrooms and herbs',
    price: 34,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Chicken', 'White wine', 'Mushrooms', 'Herbs']
  },
  {
    id: 34,
    name: 'Prime Rib',
    description: 'Slow-roasted prime rib with horseradish cream and Yorkshire pudding',
    price: 62,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Prime rib', 'Horseradish cream', 'Yorkshire pudding']
  },
  {
    id: 35,
    name: 'Mahi Mahi',
    description: 'Grilled mahi mahi with mango salsa and coconut rice',
    price: 36,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Mahi mahi', 'Mango salsa', 'Coconut rice']
  },
  {
    id: 36,
    name: 'Stuffed Pork Chops',
    description: 'Thick-cut pork chops stuffed with sage and apple stuffing',
    price: 32,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Pork chops', 'Sage', 'Apple stuffing', 'Gravy']
  },
  {
    id: 37,
    name: 'Halibut Steak',
    description: 'Pan-seared halibut with lemon butter and capers',
    price: 44,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Halibut steak', 'Lemon butter', 'Capers', 'Herbs']
  },
  {
    id: 38,
    name: 'Turkey Breast',
    description: 'Roasted turkey breast with cranberry sauce and stuffing',
    price: 28,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Turkey breast', 'Cranberry sauce', 'Stuffing', 'Gravy']
  },
  {
    id: 39,
    name: 'Vegetable Curry',
    description: 'Spiced mixed vegetables in coconut curry sauce with basmati rice',
    price: 22,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Mixed vegetables', 'Coconut curry', 'Basmati rice', 'Spices']
  },
  {
    id: 40,
    name: 'Lamb Tagine',
    description: 'Moroccan-style braised lamb with apricots and almonds',
    price: 38,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Lamb', 'Apricots', 'Almonds', 'Moroccan spices']
  },

  // Pizza (15 items)
  {
    id: 41,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 18,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Fresh basil', 'Pizza dough']
  },
  {
    id: 42,
    name: 'Pepperoni Pizza',
    description: 'Traditional pepperoni pizza with mozzarella cheese',
    price: 22,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Pepperoni', 'Pizza dough']
  },
  {
    id: 43,
    name: 'Hawaiian Pizza',
    description: 'Ham and pineapple pizza with mozzarella cheese',
    price: 24,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Ham', 'Pineapple']
  },
  {
    id: 44,
    name: 'Meat Lovers Pizza',
    description: 'Loaded with pepperoni, sausage, bacon, and ham',
    price: 28,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Pepperoni', 'Sausage', 'Bacon', 'Ham']
  },
  {
    id: 45,
    name: 'Vegetarian Deluxe',
    description: 'Bell peppers, mushrooms, onions, and olives',
    price: 20,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Bell peppers', 'Mushrooms', 'Onions', 'Olives']
  },
  {
    id: 46,
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce and red onions',
    price: 26,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['BBQ sauce', 'Mozzarella', 'Grilled chicken', 'Red onions']
  },
  {
    id: 47,
    name: 'White Pizza',
    description: 'Ricotta and mozzarella cheese with garlic and herbs',
    price: 22,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Ricotta', 'Mozzarella', 'Garlic', 'Herbs']
  },
  {
    id: 48,
    name: 'Supreme Pizza',
    description: 'Pepperoni, sausage, peppers, onions, and mushrooms',
    price: 30,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Pepperoni', 'Sausage', 'Peppers', 'Onions', 'Mushrooms']
  },
  {
    id: 49,
    name: 'Quattro Stagioni',
    description: 'Four seasons pizza with artichokes, ham, mushrooms, and olives',
    price: 28,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Artichokes', 'Ham', 'Mushrooms', 'Olives']
  },
  {
    id: 50,
    name: 'Prosciutto e Funghi',
    description: 'Prosciutto and mushroom pizza with arugula',
    price: 26,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Prosciutto', 'Mushrooms', 'Arugula']
  },
  {
    id: 51,
    name: 'Calzone',
    description: 'Folded pizza with ricotta, mozzarella, and your choice of filling',
    price: 20,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Pizza dough', 'Ricotta', 'Mozzarella', 'Herbs']
  },
  {
    id: 52,
    name: 'Buffalo Chicken Pizza',
    description: 'Spicy buffalo chicken with blue cheese and celery',
    price: 24,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Buffalo sauce', 'Mozzarella', 'Chicken', 'Blue cheese', 'Celery']
  },
  {
    id: 53,
    name: 'Truffle Pizza',
    description: 'Gourmet pizza with truffle oil, mushrooms, and parmesan',
    price: 32,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Truffle oil', 'Mozzarella', 'Mushrooms', 'Parmesan']
  },
  {
    id: 54,
    name: 'Seafood Pizza',
    description: 'Mixed seafood with garlic and herbs',
    price: 30,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Tomato sauce', 'Mozzarella', 'Mixed seafood', 'Garlic', 'Herbs']
  },
  {
    id: 55,
    name: 'Vegan Pizza',
    description: 'Plant-based cheese with vegetables and vegan pepperoni',
    price: 22,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Tomato sauce', 'Vegan cheese', 'Vegetables', 'Vegan pepperoni']
  },

  // Pasta (15 items)
  {
    id: 56,
    name: 'Spaghetti Carbonara',
    description: 'Classic Roman pasta with eggs, pancetta, and parmesan',
    price: 22,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black pepper']
  },
  {
    id: 57,
    name: 'Fettuccine Alfredo',
    description: 'Creamy fettuccine pasta with butter and parmesan',
    price: 20,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Fettuccine', 'Butter', 'Heavy cream', 'Parmesan']
  },
  {
    id: 58,
    name: 'Penne Arrabbiata',
    description: 'Spicy tomato sauce with garlic, chili, and herbs',
    price: 18,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Penne', 'Tomato sauce', 'Garlic', 'Chili', 'Herbs']
  },
  {
    id: 59,
    name: 'Lasagna Bolognese',
    description: 'Layered pasta with meat sauce and béchamel',
    price: 26,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Lasagna sheets', 'Bolognese sauce', 'Béchamel', 'Parmesan']
  },
  {
    id: 60,
    name: 'Ravioli Spinach & Ricotta',
    description: 'Fresh ravioli filled with spinach and ricotta cheese',
    price: 24,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Ravioli', 'Spinach', 'Ricotta', 'Tomato sauce']
  },
  {
    id: 61,
    name: 'Linguine Clams',
    description: 'Fresh clams with white wine and garlic sauce',
    price: 28,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Linguine', 'Fresh clams', 'White wine', 'Garlic', 'Parsley']
  },
  {
    id: 62,
    name: 'Gnocchi Gorgonzola',
    description: 'Potato gnocchi in creamy gorgonzola sauce',
    price: 22,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Potato gnocchi', 'Gorgonzola', 'Cream', 'Walnuts']
  },
  {
    id: 63,
    name: 'Spaghetti Bolognese',
    description: 'Traditional meat sauce with herbs and parmesan',
    price: 20,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Spaghetti', 'Ground beef', 'Tomato sauce', 'Herbs', 'Parmesan']
  },
  {
    id: 64,
    name: 'Penne Puttanesca',
    description: 'Tomato sauce with olives, capers, and anchovies',
    price: 19,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Penne', 'Tomato sauce', 'Olives', 'Capers', 'Anchovies']
  },
  {
    id: 65,
    name: 'Tortellini Pesto',
    description: 'Cheese tortellini with fresh basil pesto',
    price: 23,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Tortellini', 'Basil pesto', 'Pine nuts', 'Parmesan']
  },
  {
    id: 66,
    name: 'Rigatoni Amatriciana',
    description: 'Spicy tomato sauce with pancetta and pecorino',
    price: 21,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Rigatoni', 'Tomato sauce', 'Pancetta', 'Pecorino', 'Chili']
  },
  {
    id: 67,
    name: 'Farfalle Salmon',
    description: 'Bow-tie pasta with smoked salmon and cream sauce',
    price: 26,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Farfalle', 'Smoked salmon', 'Cream sauce', 'Dill']
  },
  {
    id: 68,
    name: 'Orecchiette Broccoli',
    description: 'Ear-shaped pasta with broccoli and garlic',
    price: 18,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Orecchiette', 'Broccoli', 'Garlic', 'Olive oil', 'Parmesan']
  },
  {
    id: 69,
    name: 'Pappardelle Mushroom',
    description: 'Wide pasta ribbons with wild mushroom ragu',
    price: 25,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Pappardelle', 'Wild mushrooms', 'Cream', 'Herbs']
  },
  {
    id: 70,
    name: 'Agnolotti del Plin',
    description: 'Small stuffed pasta with meat filling and butter sauce',
    price: 28,
    category: 'pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Agnolotti', 'Meat filling', 'Butter', 'Sage', 'Parmesan']
  },

  // Salads (10 items)
  {
    id: 71,
    name: 'Caesar Salad',
    description: 'Romaine lettuce with parmesan, croutons, and Caesar dressing',
    price: 14,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Romaine lettuce', 'Parmesan', 'Croutons', 'Caesar dressing']
  },
  {
    id: 72,
    name: 'Greek Salad',
    description: 'Fresh vegetables with feta cheese and olive oil',
    price: 16,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Tomatoes', 'Cucumber', 'Olives', 'Feta cheese', 'Olive oil']
  },
  {
    id: 73,
    name: 'Arugula Salad',
    description: 'Peppery arugula with cherry tomatoes and balsamic',
    price: 12,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Arugula', 'Cherry tomatoes', 'Balsamic vinegar', 'Olive oil']
  },
  {
    id: 74,
    name: 'Cobb Salad',
    description: 'Mixed greens with bacon, chicken, eggs, and blue cheese',
    price: 18,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Mixed greens', 'Bacon', 'Chicken', 'Eggs', 'Blue cheese']
  },
  {
    id: 75,
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    price: 15,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Fresh mozzarella', 'Tomatoes', 'Basil', 'Balsamic glaze']
  },
  {
    id: 76,
    name: 'Quinoa Salad',
    description: 'Healthy quinoa with vegetables and lemon dressing',
    price: 16,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Quinoa', 'Vegetables', 'Lemon dressing', 'Herbs']
  },
  {
    id: 77,
    name: 'Spinach Salad',
    description: 'Baby spinach with strawberries and poppy seed dressing',
    price: 14,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Baby spinach', 'Strawberries', 'Poppy seed dressing', 'Nuts']
  },
  {
    id: 78,
    name: 'Waldorf Salad',
    description: 'Apples, celery, grapes, and walnuts with mayo dressing',
    price: 13,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Apples', 'Celery', 'Grapes', 'Walnuts', 'Mayo dressing']
  },
  {
    id: 79,
    name: 'Nicoise Salad',
    description: 'French salad with tuna, olives, and hard-boiled eggs',
    price: 19,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Mixed greens', 'Tuna', 'Olives', 'Hard-boiled eggs', 'Anchovies']
  },
  {
    id: 80,
    name: 'Asian Chicken Salad',
    description: 'Grilled chicken with Asian vegetables and sesame dressing',
    price: 17,
    category: 'salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Grilled chicken', 'Asian vegetables', 'Sesame dressing', 'Nuts']
  },

  // Seafood (10 items)
  {
    id: 81,
    name: 'Grilled Lobster Tail',
    description: 'Fresh lobster tail grilled with garlic butter',
    price: 45,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Lobster tail', 'Garlic butter', 'Lemon', 'Herbs']
  },
  {
    id: 82,
    name: 'Pan-Seared Scallops',
    description: 'Large sea scallops with cauliflower puree',
    price: 38,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Sea scallops', 'Cauliflower puree', 'Bacon', 'Microgreens']
  },
  {
    id: 83,
    name: 'Grilled Salmon',
    description: 'Atlantic salmon with dill sauce and vegetables',
    price: 32,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Atlantic salmon', 'Dill sauce', 'Vegetables', 'Lemon']
  },
  {
    id: 84,
    name: 'Shrimp Scampi',
    description: 'Jumbo shrimp in garlic white wine sauce',
    price: 28,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Jumbo shrimp', 'Garlic', 'White wine', 'Butter', 'Parsley']
  },
  {
    id: 85,
    name: 'Fish Tacos',
    description: 'Grilled fish with cabbage slaw and chipotle mayo',
    price: 22,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: [],
    ingredients: ['Grilled fish', 'Cabbage slaw', 'Chipotle mayo', 'Tortillas']
  },
  {
    id: 86,
    name: 'Crab Cakes',
    description: 'Maryland-style crab cakes with remoulade sauce',
    price: 35,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Crab meat', 'Breadcrumbs', 'Remoulade sauce', 'Herbs']
  },
  {
    id: 87,
    name: 'Seafood Paella',
    description: 'Traditional Spanish rice with mixed seafood',
    price: 42,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Bomba rice', 'Mixed seafood', 'Saffron', 'Vegetables']
  },
  {
    id: 88,
    name: 'Blackened Catfish',
    description: 'Cajun-spiced catfish with dirty rice',
    price: 26,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Catfish', 'Cajun spices', 'Dirty rice', 'Vegetables']
  },
  {
    id: 89,
    name: 'Oysters Rockefeller',
    description: 'Fresh oysters with spinach and hollandaise',
    price: 30,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Fresh oysters', 'Spinach', 'Hollandaise', 'Herbs']
  },
  {
    id: 90,
    name: 'Cioppino',
    description: 'San Francisco seafood stew with sourdough bread',
    price: 36,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: [],
    ingredients: ['Mixed seafood', 'Tomato broth', 'Sourdough bread', 'Herbs']
  },

  // Steaks (10 items)
  {
    id: 91,
    name: 'Filet Mignon',
    description: 'Tender beef tenderloin with red wine reduction',
    price: 65,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Beef tenderloin', 'Red wine reduction', 'Vegetables']
  },
  {
    id: 92,
    name: 'Ribeye Steak',
    description: 'Marbled ribeye with garlic mashed potatoes',
    price: 58,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Ribeye steak', 'Garlic mashed potatoes', 'Vegetables']
  },
  {
    id: 93,
    name: 'New York Strip',
    description: 'Classic strip steak with herb butter',
    price: 52,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['NY strip steak', 'Herb butter', 'Roasted potatoes']
  },
  {
    id: 94,
    name: 'T-Bone Steak',
    description: 'Large T-bone with bone marrow and vegetables',
    price: 68,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['T-bone steak', 'Bone marrow', 'Vegetables', 'Herbs']
  },
  {
    id: 95,
    name: 'Porterhouse',
    description: 'Large porterhouse steak for sharing',
    price: 85,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Porterhouse steak', 'Compound butter', 'Sides']
  },
  {
    id: 96,
    name: 'Sirloin Steak',
    description: 'Lean sirloin with chimichurri sauce',
    price: 38,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Sirloin steak', 'Chimichurri', 'Vegetables']
  },
  {
    id: 97,
    name: 'Tomahawk Steak',
    description: 'Impressive tomahawk ribeye with truffle butter',
    price: 95,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Tomahawk ribeye', 'Truffle butter', 'Roasted vegetables']
  },
  {
    id: 98,
    name: 'Wagyu Beef',
    description: 'Premium Japanese wagyu with minimal seasoning',
    price: 120,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Wagyu beef', 'Sea salt', 'Wasabi', 'Soy sauce']
  },
  {
    id: 99,
    name: 'Cowboy Steak',
    description: 'Bone-in ribeye with southwestern spices',
    price: 72,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Bone-in ribeye', 'Southwestern spices', 'Corn', 'Peppers']
  },
  {
    id: 100,
    name: 'Surf and Turf',
    description: 'Filet mignon with lobster tail',
    price: 85,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Filet mignon', 'Lobster tail', 'Garlic butter', 'Vegetables']
  },

  // Side Dishes (10 items)
  {
    id: 101,
    name: 'Truffle Parmesan Fries',
    description: 'Crispy fries tossed in truffle oil and grated parmesan',
    price: 14,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Potatoes', 'Truffle oil', 'Parmesan', 'Sea salt', 'Herbs']
  },
  {
    id: 102,
    name: 'Roasted Brussels Sprouts',
    description: 'Crispy brussels sprouts with bacon lardons and maple glaze',
    price: 12,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1459906006095-0ac362d4e884?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Brussels sprouts', 'Bacon', 'Maple syrup', 'Balsamic vinegar']
  },
  {
    id: 103,
    name: 'Garlic Mashed Potatoes',
    description: 'Creamy mashed potatoes with roasted garlic',
    price: 10,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1459906006095-0ac362d4e884?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Potatoes', 'Roasted garlic', 'Butter', 'Cream']
  },
  {
    id: 104,
    name: 'Grilled Asparagus',
    description: 'Fresh asparagus with lemon and parmesan',
    price: 11,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1459906006095-0ac362d4e884?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Asparagus', 'Lemon', 'Parmesan', 'Olive oil']
  },
  {
    id: 105,
    name: 'Wild Rice Pilaf',
    description: 'Wild rice with cranberries and toasted almonds',
    price: 9,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1459906006095-0ac362d4e884?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Wild rice', 'Cranberries', 'Almonds', 'Herbs']
  },
  {
    id: 106,
    name: 'Creamed Spinach',
    description: 'Classic creamed spinach with nutmeg',
    price: 8,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1459906006095-0ac362d4e884?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Spinach', 'Cream', 'Nutmeg', 'Onions']
  },
  {
    id: 107,
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with cinnamon',
    price: 10,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Sweet potatoes', 'Cinnamon', 'Sea salt', 'Olive oil']
  },
  {
    id: 108,
    name: 'Mac and Cheese',
    description: 'Three-cheese macaroni with breadcrumb topping',
    price: 12,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1459906006095-0ac362d4e884?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Macaroni', 'Three cheeses', 'Breadcrumbs', 'Butter']
  },
  {
    id: 109,
    name: 'Roasted Vegetables',
    description: 'Seasonal roasted vegetables with herbs',
    price: 9,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1459906006095-0ac362d4e884?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Seasonal vegetables', 'Herbs', 'Olive oil', 'Balsamic']
  },
  {
    id: 110,
    name: 'Onion Rings',
    description: 'Beer-battered onion rings with ranch dipping sauce',
    price: 8,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Onions', 'Beer batter', 'Ranch sauce', 'Spices']
  },

  // Desserts (10 items)
  {
    id: 111,
    name: 'Dark Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream and salted caramel',
    price: 16,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Dark chocolate', 'Eggs', 'Butter', 'Sugar', 'Vanilla ice cream']
  },
  {
    id: 112,
    name: 'Panna Cotta',
    description: 'Vanilla bean panna cotta with seasonal berries and almond tuile',
    price: 14,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Heavy cream', 'Vanilla bean', 'Seasonal berries', 'Mint']
  },
  {
    id: 113,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso and mascarpone',
    price: 12,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Mascarpone', 'Espresso', 'Ladyfingers', 'Cocoa']
  },
  {
    id: 114,
    name: 'Crème Brûlée',
    description: 'Vanilla custard with caramelized sugar crust',
    price: 13,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Heavy cream', 'Vanilla', 'Egg yolks', 'Sugar']
  },
  {
    id: 115,
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    price: 11,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Cream cheese', 'Graham crackers', 'Berry compote', 'Sour cream']
  },
  {
    id: 116,
    name: 'Chocolate Lava Cake',
    description: 'Molten chocolate cake with vanilla ice cream',
    price: 15,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=500',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Vanilla ice cream']
  },
  {
    id: 117,
    name: 'Apple Tart',
    description: 'French apple tart with cinnamon ice cream',
    price: 12,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian'],
    ingredients: ['Apples', 'Pastry', 'Cinnamon', 'Ice cream']
  },
  {
    id: 118,
    name: 'Gelato Trio',
    description: 'Three scoops of artisanal gelato',
    price: 10,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Artisanal gelato', 'Fresh fruits', 'Mint']
  },
  {
    id: 119,
    name: 'Chocolate Mousse',
    description: 'Rich chocolate mousse with whipped cream',
    price: 9,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Dark chocolate', 'Eggs', 'Whipped cream', 'Berries']
  },
  {
    id: 120,
    name: 'Bananas Foster',
    description: 'Flambéed bananas with vanilla ice cream',
    price: 14,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&w=500',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Bananas', 'Rum', 'Brown sugar', 'Vanilla ice cream']
  },

  // Drinks (10 items)
  {
    id: 121,
    name: 'Signature Martini',
    description: 'House-infused botanical gin with dry vermouth and olive',
    price: 18,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&w=500',
    popular: true,
    ingredients: ['Botanical gin', 'Dry vermouth', 'Olive']
  },
  {
    id: 122,
    name: 'Sommelier\'s Wine Selection',
    description: 'Selection of premium wines curated by our sommelier',
    price: 22,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1506377872008-6645d6519e3b?ixlib=rb-4.0.3&w=500',
    popular: false,
    ingredients: ['Selected wine']
  },
  {
    id: 123,
    name: 'Old Fashioned',
    description: 'Classic cocktail with bourbon, sugar, and bitters',
    price: 16,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&w=500',
    popular: true,
    ingredients: ['Bourbon', 'Sugar', 'Bitters', 'Orange peel']
  },
  {
    id: 124,
    name: 'Craft Beer Selection',
    description: 'Rotating selection of local craft beers',
    price: 8,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-4.0.3&w=500',
    popular: true,
    ingredients: ['Craft beer']
  },
  {
    id: 125,
    name: 'Mojito',
    description: 'Fresh mint, lime, and white rum cocktail',
    price: 14,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&w=500',
    popular: false,
    ingredients: ['White rum', 'Mint', 'Lime', 'Soda water']
  },
  {
    id: 126,
    name: 'Espresso Martini',
    description: 'Vodka and espresso cocktail with coffee beans',
    price: 17,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&w=500',
    popular: true,
    ingredients: ['Vodka', 'Espresso', 'Coffee liqueur', 'Coffee beans']
  },
  {
    id: 127,
    name: 'Whiskey Sour',
    description: 'Bourbon with lemon juice and egg white',
    price: 15,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&w=500',
    popular: false,
    ingredients: ['Bourbon', 'Lemon juice', 'Simple syrup', 'Egg white']
  },
  {
    id: 128,
    name: 'Champagne Cocktail',
    description: 'Premium champagne with bitters and sugar',
    price: 25,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1506377872008-6645d6519e3b?ixlib=rb-4.0.3&w=500',
    popular: false,
    ingredients: ['Champagne', 'Bitters', 'Sugar', 'Orange twist']
  },
  {
    id: 129,
    name: 'Fresh Juice Blend',
    description: 'Daily selection of fresh pressed juices',
    price: 6,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&w=500',
    popular: false,
    ingredients: ['Fresh fruits', 'Vegetables']
  },
  {
    id: 130,
    name: 'Premium Coffee',
    description: 'Single origin coffee beans, various preparations',
    price: 5,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&w=500',
    popular: true,
    ingredients: ['Single origin coffee beans']
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, addToLiked, isInCart, isLiked } = useShoppingContext();
  
  // Filter menu items based on active category and search query
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle dish selection and modal opening
  const handleDishClick = (dish: any) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  
  // Handle adding to cart
  const handleAddToCart = (dish: any) => {
    addToCart(dish);
  };
  
  // Handle adding to favorites
  const handleAddToFavorites = (dish: any) => {
    addToLiked(dish);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4 animate-pulse">
              Our Menu
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto animate-fade-in">
              Explore our exceptional dishes crafted with the finest ingredients
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Search menu..."
                className="pl-10 bg-white/5 border-cyan-400/30 text-white shadow-lg shadow-cyan-400/20 focus:shadow-cyan-400/40 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                className={activeCategory === 'all' 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-300' 
                  : 'bg-white/5 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300'}
                onClick={() => setActiveCategory('all')}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className={activeCategory === category.id 
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-300' 
                    : 'bg-white/5 border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300'}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item, index) => (
              <div 
                key={item.id} 
                className="glass-card overflow-hidden cursor-pointer group transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleDishClick(item)}
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  
                  {/* Quick action buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${isLiked(item.id) 
                        ? 'bg-pink-500/20 border-pink-400/30 text-pink-400 hover:bg-pink-500/30 shadow-lg shadow-pink-400/20' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20'} transition-all duration-300`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavorites(item);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isLiked(item.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  {/* Popular badge */}
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 text-xs font-semibold px-2 py-1 rounded animate-pulse">
                      Popular
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">{item.name}</h3>
                  <p className="text-gray-400 line-clamp-2 mb-4">{item.description}</p>
                  
                  {/* Dietary tags */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {item.dietary.includes('vegetarian') && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full border border-green-400/20">
                          Vegetarian
                        </span>
                      )}
                      {item.dietary.includes('gluten-free') && (
                        <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full border border-blue-400/20">
                          Gluten-Free
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-400 font-semibold text-lg">${item.price}</span>
                    <Button
                      size="sm"
                      className={`${isInCart(item.id) 
                        ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-400/20' 
                        : 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 hover:from-cyan-500 hover:to-purple-600 shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50'} transition-all duration-300`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {isInCart(item.id) ? 'Add More' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Dish Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-800 border-cyan-400/20 text-white max-w-2xl shadow-2xl shadow-cyan-400/20">
          {selectedDish && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-cyan-400">
                  {selectedDish.name}
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  {selectedDish.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="h-56 relative overflow-hidden my-4 rounded-md">
                <img 
                  src={selectedDish.image} 
                  alt={selectedDish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-cyan-400">Ingredients</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {selectedDish.ingredients.map((ingredient: string, idx: number) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedDish.dietary && selectedDish.dietary.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 text-cyan-400">Dietary</h3>
                    <div className="flex gap-2">
                      {selectedDish.dietary.includes('vegetarian') && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full border border-green-400/20">
                          Vegetarian
                        </span>
                      )}
                      {selectedDish.dietary.includes('gluten-free') && (
                        <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full border border-blue-400/20">
                          Gluten-Free
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/10">
                  <span className="text-xl text-cyan-400 font-semibold">${selectedDish.price}</span>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className={`border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 ${isLiked(selectedDish.id) ? 'text-pink-400 hover:text-pink-300 border-pink-400/30' : ''}`}
                      onClick={() => handleAddToFavorites(selectedDish)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked(selectedDish.id) ? 'fill-current' : ''}`} />
                      {isLiked(selectedDish.id) ? 'Favorited' : 'Favorite'}
                    </Button>
                    <Button
                      className={`${isInCart(selectedDish.id) 
                        ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-400/20' 
                        : 'bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 hover:from-cyan-500 hover:to-purple-600 shadow-lg shadow-cyan-400/30'} transition-all duration-300`}
                      onClick={() => handleAddToCart(selectedDish)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isInCart(selectedDish.id) ? 'Add More' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Menu;
