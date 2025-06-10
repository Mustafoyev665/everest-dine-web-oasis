
-- Insert 50 new menu items with variety across different categories
INSERT INTO menu_items (name_uz, name_en, name_ru, description_uz, description_en, description_ru, price, category, image, rating, is_active) VALUES

-- Appetizers (10 items)
('Qarsildoq pishloq to''plari', 'Crispy Cheese Balls', 'Хрустящие сырные шарики', 'Mazali pishloq va ko''katlar bilan', 'Delicious cheese and herbs', 'Вкусный сыр с зеленью', 18.50, 'appetizers', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.5, true),
('Tovuq qanatlari', 'Buffalo Wings', 'Куриные крылышки', 'Achchiq sous bilan pishirilgan', 'Cooked with spicy sauce', 'Приготовлено с острым соусом', 22.00, 'appetizers', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.7, true),
('Baliq filesi', 'Fish Fingers', 'Рыбные палочки', 'Yangi baliq go''shti bilan', 'Fresh fish meat', 'Свежее рыбное мясо', 25.00, 'appetizers', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.3, true),
('Krevetka salatasi', 'Shrimp Salad', 'Салат с креветками', 'Toza sabzavotlar bilan', 'With fresh vegetables', 'Со свежими овощами', 28.00, 'appetizers', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.6, true),
('Qo''ziqorin sho''rvasi', 'Mushroom Soup', 'Грибной суп', 'Krema va ko''katlar bilan', 'With cream and herbs', 'Со сливками и зеленью', 16.00, 'appetizers', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.4, true),
('Bruschetta', 'Italian Bruschetta', 'Итальянская брускетта', 'Pomidor va rayhon bilan', 'With tomato and basil', 'С томатами и базиликом', 14.50, 'appetizers', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.2, true),
('Mol go''shti ruletlari', 'Beef Rolls', 'Говяжьи рулетики', 'Pishloq va sabzavot bilan', 'With cheese and vegetables', 'С сыром и овощами', 32.00, 'appetizers', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.8, true),
('Dengiz mahsulotlari', 'Seafood Platter', 'Морепродукты', 'Aralash dengiz mahsulotlari', 'Mixed seafood', 'Смешанные морепродукты', 45.00, 'appetizers', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.9, true),
('Kartoshka to''plari', 'Potato Balls', 'Картофельные шарики', 'Ichida pishloq bilan', 'Filled with cheese', 'С начинкой из сыра', 12.00, 'appetizers', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.1, true),
('Salami va pishloq', 'Salami & Cheese', 'Салями и сыр', 'Premium salami va pishloq', 'Premium salami and cheese', 'Премиум салями и сыр', 26.00, 'appetizers', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.5, true),

-- Main Courses (15 items)
('Qo''zi kabob', 'Lamb Kebab', 'Шашлык из баранины', 'An''anaviy usulda pishirilgan', 'Cooked in traditional way', 'Приготовлено традиционным способом', 35.00, 'mains', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.8, true),
('Tovuq steyk', 'Chicken Steak', 'Куриный стейк', 'Sabzavotlar bilan xizmat qilinadi', 'Served with vegetables', 'Подается с овощами', 28.00, 'mains', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.6, true),
('Somon baliq', 'Grilled Salmon', 'Жареный лосось', 'Limon va ko''katlar bilan', 'With lemon and herbs', 'С лимоном и зеленью', 42.00, 'mains', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.7, true),
('Mol go''shti steyk', 'Beef Steak', 'Говяжий стейк', 'Premium mol go''shti', 'Premium beef', 'Премиум говядина', 48.00, 'mains', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.9, true),
('Cho''chqa go''shti', 'Pork Ribs', 'Свиные ребрышки', 'BBQ sous bilan', 'With BBQ sauce', 'С соусом барбекю', 38.00, 'mains', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.5, true),
('Dengiz okuni', 'Sea Bass', 'Морской окунь', 'Grilda pishirilgan', 'Grilled to perfection', 'Приготовлено на гриле', 44.00, 'mains', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.6, true),
('Qo''zi oyoq', 'Lamb Leg', 'Баранья нога', 'Yavaş olovda pishirilgan', 'Slow cooked', 'Медленно приготовлено', 52.00, 'mains', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.8, true),
('Tovuq ragu', 'Chicken Ragu', 'Куриное рагу', 'Sabzavotlar va somsalar bilan', 'With vegetables and sauce', 'С овощами и соусом', 26.00, 'mains', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.4, true),
('Baliq va kartoshka', 'Fish & Chips', 'Рыба с картошкой', 'Ingliz uslubida', 'English style', 'В английском стиле', 24.00, 'mains', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.3, true),
('Qo''zi qovurma', 'Lamb Stir Fry', 'Жареная баранина', 'Sabzavotlar bilan qovurilgan', 'Stir fried with vegetables', 'Жареное с овощами', 32.00, 'mains', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.5, true),
('Tovuq curry', 'Chicken Curry', 'Куриное карри', 'Hindiston usulida', 'Indian style', 'В индийском стиле', 29.00, 'mains', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.6, true),
('Qo''zi barrah', 'Lamb Chops', 'Бараньи отбивные', 'Ko''katlar bilan marinlangan', 'Marinated with herbs', 'Маринованное с травами', 46.00, 'mains', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.7, true),
('Dengiz mahsulotlari risotto', 'Seafood Risotto', 'Ризотто с морепродуктами', 'Krevetka va midiya bilan', 'With shrimp and mussels', 'С креветками и мидиями', 36.00, 'mains', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.8, true),
('Tovuq teriyaki', 'Chicken Teriyaki', 'Курица терияки', 'Yapon usulida', 'Japanese style', 'В японском стиле', 31.00, 'mains', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.5, true),
('Qo''zi manti', 'Lamb Dumplings', 'Пельмени с бараниной', 'O''zbekcha manti', 'Uzbek style dumplings', 'Узбекские манты', 22.00, 'mains', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.9, true),

-- Pizza (10 items)
('Margarita pitsa', 'Margherita Pizza', 'Пицца Маргарита', 'Pomidor, pishloq, rayhon', 'Tomato, cheese, basil', 'Томаты, сыр, базилик', 20.00, 'pizza', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.5, true),
('Pepperoni pitsa', 'Pepperoni Pizza', 'Пицца Пепперони', 'Pepperoni kolbasa bilan', 'With pepperoni sausage', 'С колбасой пепперони', 24.00, 'pizza', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.6, true),
('Qo''ziqorin pitsa', 'Mushroom Pizza', 'Пицца с грибами', 'Turli qo''ziqorinlar bilan', 'With various mushrooms', 'С различными грибами', 22.00, 'pizza', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.4, true),
('Dengiz mahsulotlari pitsa', 'Seafood Pizza', 'Пицца с морепродуктами', 'Krevetka va kalamari bilan', 'With shrimp and squid', 'С креветками и кальмарами', 32.00, 'pizza', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.7, true),
('Tovuq pitsa', 'Chicken Pizza', 'Пицца с курицей', 'Qovurilgan tovuq bilan', 'With grilled chicken', 'С жареной курицей', 26.00, 'pizza', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.5, true),
('Vegetarian pitsa', 'Vegetarian Pizza', 'Вегетарианская пицца', 'Sabzavotlar bilan', 'With vegetables', 'С овощами', 18.00, 'pizza', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.3, true),
('Hawaiian pitsa', 'Hawaiian Pizza', 'Гавайская пицца', 'Ananas va jambon bilan', 'With pineapple and ham', 'С ананасом и ветчиной', 25.00, 'pizza', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.2, true),
('Quattro Formaggi', 'Four Cheese Pizza', 'Пицца четыре сыра', 'To''rt xil pishloq', 'Four different cheeses', 'Четыре разных сыра', 28.00, 'pizza', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.6, true),
('Diavola pitsa', 'Spicy Diavola', 'Острая Дьявола', 'Achchiq kolbasa bilan', 'With spicy sausage', 'С острой колбасой', 26.00, 'pizza', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.4, true),
('Kalzone pitsa', 'Calzone Pizza', 'Кальцоне', 'Yopiq pitsa', 'Closed pizza', 'Закрытая пицца', 23.00, 'pizza', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.5, true),

-- Pasta (8 items)
('Karbonara', 'Carbonara Pasta', 'Паста Карбонара', 'Tuxum va pishloq bilan', 'With egg and cheese', 'С яйцом и сыром', 24.00, 'pasta', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.7, true),
('Bolognese', 'Bolognese Pasta', 'Паста Болоньезе', 'Go''shtli sous bilan', 'With meat sauce', 'С мясным соусом', 26.00, 'pasta', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.6, true),
('Alfredo', 'Alfredo Pasta', 'Паста Альфредо', 'Kremali sous bilan', 'With cream sauce', 'Со сливочным соусом', 22.00, 'pasta', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.5, true),
('Pesto', 'Pesto Pasta', 'Паста Песто', 'Rayhon va yong''oq bilan', 'With basil and nuts', 'С базиликом и орехами', 20.00, 'pasta', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.4, true),
('Lasagna', 'Beef Lasagna', 'Лазанья с говядиной', 'Go''sht va pishloq bilan', 'With meat and cheese', 'С мясом и сыром', 28.00, 'pasta', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.8, true),
('Ravioli', 'Cheese Ravioli', 'Равиоли с сыром', 'Pishloq bilan to''ldirilgan', 'Filled with cheese', 'Начиненные сыром', 25.00, 'pasta', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.6, true),
('Amatriciana', 'Amatriciana Pasta', 'Паста Аматричана', 'Pomidor va cho''chqa go''shti', 'Tomato and pork', 'Томаты и свинина', 24.00, 'pasta', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.5, true),
('Gnocchi', 'Potato Gnocchi', 'Картофельные ньокки', 'Kartoshka xamiri', 'Potato dumplings', 'Картофельные клецки', 21.00, 'pasta', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.3, true),

-- Desserts (7 items)
('Tiramisu', 'Classic Tiramisu', 'Классический тирамису', 'Kofe va maskarpone bilan', 'With coffee and mascarpone', 'С кофе и маскарпоне', 15.00, 'desserts', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.8, true),
('Shokoladli tort', 'Chocolate Cake', 'Шоколадный торт', 'Boy shokoladli tort', 'Rich chocolate cake', 'Насыщенный шоколадный торт', 12.00, 'desserts', 'https://images.unsplash.com/photo-1559847844-d721426d6edc', 4.6, true),
('Panna Cotta', 'Vanilla Panna Cotta', 'Панна котта ваниль', 'Vanil ta''mli desert', 'Vanilla flavored dessert', 'Десерт со вкусом ванили', 13.00, 'desserts', 'https://images.unsplash.com/photo-1558030006-450675393462', 4.5, true),
('Cheesecake', 'New York Cheesecake', 'Нью-йоркский чизкейк', 'Pishloqli tort', 'Cheese cake', 'Творожный торт', 14.00, 'desserts', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add', 4.7, true),
('Gelato', 'Italian Gelato', 'Итальянское джелато', 'Muzqaymoq turli ta''mlar', 'Ice cream various flavors', 'Мороженое разные вкусы', 8.00, 'desserts', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', 4.4, true),
('Profiterol', 'Cream Profiteroles', 'Профитроли со сливками', 'Krem bilan to''ldirilgan', 'Filled with cream', 'Наполненные кремом', 11.00, 'desserts', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.3, true),
('Browni', 'Chocolate Brownie', 'Шоколадный брауни', 'Yong''oq bilan', 'With nuts', 'С орехами', 10.00, 'desserts', 'https://images.unsplash.com/photo-1544025162-d76694265947', 4.5, true);
