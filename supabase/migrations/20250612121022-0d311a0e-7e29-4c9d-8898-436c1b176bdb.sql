
-- Add 50 more diverse menu items to reach approximately 100 total products
INSERT INTO menu_items (name_uz, name_en, name_ru, description_uz, description_en, description_ru, price, category, image, rating, is_active) VALUES

-- Beverages & Drinks (15 items)
('Qora choy', 'Black Tea', 'Черный чай', 'An''anaviy qora choy', 'Traditional black tea', 'Традиционный черный чай', 3.00, 'beverages', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574', 4.3, true),
('Yashil choy', 'Green Tea', 'Зеленый чай', 'Sog''lom yashil choy', 'Healthy green tea', 'Здоровый зеленый чай', 3.50, 'beverages', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc', 4.4, true),
('Kofe espresso', 'Espresso Coffee', 'Кофе эспрессо', 'Kuchli espresso kofe', 'Strong espresso coffee', 'Крепкий кофе эспрессо', 4.50, 'beverages', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 4.6, true),
('Kapuchino', 'Cappuccino', 'Капучино', 'Sutli kapuchino kofe', 'Creamy cappuccino coffee', 'Кремовый капучино', 5.00, 'beverages', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d', 4.7, true),
('Latte', 'Cafe Latte', 'Кафе латте', 'Yumshoq latte kofe', 'Smooth cafe latte', 'Гладкий кафе латте', 5.50, 'beverages', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', 4.5, true),
('Olma sharbati', 'Apple Juice', 'Яблочный сок', 'Yangi olma sharbati', 'Fresh apple juice', 'Свежий яблочный сок', 4.00, 'beverages', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba', 4.2, true),
('Apelsin sharbati', 'Orange Juice', 'Апельсиновый сок', 'Yangi apelsin sharbati', 'Fresh orange juice', 'Свежий апельсиновый сок', 4.50, 'beverages', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b', 4.4, true),
('Smoothie', 'Mixed Fruit Smoothie', 'Фруктовый смузи', 'Aralash mevali smuzi', 'Mixed fruit smoothie', 'Смешанный фруктовый смузи', 6.00, 'beverages', 'https://images.unsplash.com/photo-1553530666-ba11a7da3888', 4.6, true),
('Limonad', 'Fresh Lemonade', 'Свежий лимонад', 'Yangi limonad', 'Fresh lemonade', 'Свежий лимонад', 3.50, 'beverages', 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9', 4.3, true),
('Kokteyl', 'Fruit Cocktail', 'Фруктовый коктейль', 'Mevali kokteyl', 'Fruit cocktail drink', 'Фруктовый коктейль', 5.50, 'beverages', 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19', 4.5, true),
('Ayron', 'Traditional Ayran', 'Традиционный айран', 'An''anaviy ayron ichimlik', 'Traditional ayran drink', 'Традиционный напиток айран', 3.00, 'beverages', 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8', 4.1, true),
('Sut kokteyeli', 'Milk Shake', 'Молочный коктейль', 'Shirin sut kokteyeli', 'Sweet milk shake', 'Сладкий молочный коктейль', 5.00, 'beverages', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699', 4.4, true),
('Gazli suv', 'Sparkling Water', 'Газированная вода', 'Gazli mineral suv', 'Sparkling mineral water', 'Газированная минеральная вода', 2.50, 'beverages', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2', 4.0, true),
('Kompot', 'Fruit Compote', 'Фруктовый компот', 'Mevali kompot', 'Traditional fruit compote', 'Традиционный фруктовый компот', 3.50, 'beverages', 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f', 4.2, true),
('Sharbati albaluu', 'Cherry Drink', 'Вишневый напиток', 'Albaluu sharbati', 'Sweet cherry drink', 'Сладкий вишневый напиток', 4.00, 'beverages', 'https://images.unsplash.com/photo-1553787826-f6e0fddad3b7', 4.3, true),

-- Breakfast Items (15 items)
('Omlet', 'Classic Omelet', 'Классический омлет', 'Klassik tuxum omlet', 'Classic egg omelet', 'Классический яичный омлет', 8.00, 'breakfast', 'https://images.unsplash.com/photo-1525351484163-7529414344d8', 4.4, true),
('Pancake', 'Fluffy Pancakes', 'Пышные блины', 'Yumshoq pankek', 'Fluffy pancakes', 'Пышные панкейки', 9.50, 'breakfast', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', 4.6, true),
('Tuxum bilan non', 'Eggs with Bread', 'Яйца с хлебом', 'Non bilan tuxum', 'Eggs served with bread', 'Яйца подаются с хлебом', 7.00, 'breakfast', 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', 4.2, true),
('Qaymoqli non', 'Bread with Cream', 'Хлеб со сливками', 'Qaymoq bilan non', 'Bread served with cream', 'Хлеб подается со сливками', 6.50, 'breakfast', 'https://images.unsplash.com/photo-1509440159596-0249088772ff', 4.1, true),
('Bal bilan non', 'Honey Bread', 'Хлеб с медом', 'Asal bilan non', 'Bread with honey', 'Хлеб с медом', 6.00, 'breakfast', 'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3', 4.3, true),
('Granola', 'Granola Bowl', 'Гранола', 'Sutli granola', 'Granola with milk', 'Гранола с молоком', 8.50, 'breakfast', 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38', 4.5, true),
('Yogurt parfait', 'Yogurt Parfait', 'Йогурт парфе', 'Mevali yogurt', 'Yogurt with fruits', 'Йогурт с фруктами', 7.50, 'breakfast', 'https://images.unsplash.com/photo-1488477181946-6428a0291777', 4.4, true),
('Tvorog', 'Cottage Cheese', 'Творог', 'Suzma tvorog', 'Fresh cottage cheese', 'Свежий творог', 6.50, 'breakfast', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890', 4.2, true),
('Ovsianka', 'Oatmeal Porridge', 'Овсяная каша', 'Yulaf botqasi', 'Healthy oatmeal porridge', 'Здоровая овсяная каша', 7.00, 'breakfast', 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907', 4.3, true),
('Muesli', 'Muesli Mix', 'Мюсли', 'Aralash muesli', 'Mixed muesli cereal', 'Смешанные мюсли', 8.00, 'breakfast', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', 4.4, true),
('Sandvich', 'Breakfast Sandwich', 'Завтрак сэндвич', 'Nonushta sandvichi', 'Breakfast sandwich', 'Завтрак сэндвич', 9.00, 'breakfast', 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', 4.5, true),
('Qaynatilgan tuxum', 'Boiled Eggs', 'Вареные яйца', 'Qaynatilgan tuxum', 'Perfectly boiled eggs', 'Идеально сваренные яйца', 5.50, 'breakfast', 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759', 4.1, true),
('Avokado tost', 'Avocado Toast', 'Тост с авокадо', 'Avokado bilan tost', 'Toast with avocado', 'Тост с авокадо', 10.00, 'breakfast', 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d', 4.7, true),
('Croissant', 'Butter Croissant', 'Масляный круассан', 'Sariyog''li kruassan', 'Buttery croissant', 'Масляный круассан', 7.50, 'breakfast', 'https://images.unsplash.com/photo-1555507036-ab794f4aaaa3', 4.6, true),
('Syrniki', 'Cottage Cheese Pancakes', 'Сырники', 'Tvorogdan syrniki', 'Cottage cheese pancakes', 'Сырники из творога', 8.50, 'breakfast', 'https://images.unsplash.com/photo-1551218808-94e220e084d2', 4.5, true),

-- Snacks & Light Meals (10 items)
('Chips', 'Crispy Potato Chips', 'Хрустящие чипсы', 'Kartoshkali chips', 'Crispy potato chips', 'Хрустящие картофельные чипсы', 4.00, 'snacks', 'https://images.unsplash.com/photo-1566478989037-eec170784d0b', 4.0, true),
('Yong''oq aralashmasi', 'Mixed Nuts', 'Смешанные орехи', 'Aralash yong''oqlar', 'Assorted mixed nuts', 'Ассорти смешанных орехов', 6.50, 'snacks', 'https://images.unsplash.com/photo-1508747703725-719777637510', 4.3, true),
('Popcorn', 'Butter Popcorn', 'Попкорн с маслом', 'Sariyog''li popcorn', 'Buttery popcorn', 'Попкорн с маслом', 3.50, 'snacks', 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330', 4.1, true),
('Kraker', 'Cheese Crackers', 'Сырные крекеры', 'Pishloqli kraker', 'Cheese flavored crackers', 'Крекеры со вкусом сыра', 4.50, 'snacks', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35', 4.2, true),
('Pretzel', 'Salted Pretzels', 'Соленые крендели', 'Tuzli pretzel', 'Salted pretzel snacks', 'Соленые крендели', 5.00, 'snacks', 'https://images.unsplash.com/photo-1549145753-2e8af296d0fd', 4.0, true),
('Quritilgan meva', 'Dried Fruits', 'Сухофрукты', 'Quritilgan mevalar', 'Assorted dried fruits', 'Ассорти сухофруктов', 7.00, 'snacks', 'https://images.unsplash.com/photo-1520072959219-c595dc870360', 4.4, true),
('Energy bar', 'Energy Bar', 'Энергетический батончик', 'Energiya batoni', 'Nutritious energy bar', 'Питательный энергетический батончик', 5.50, 'snacks', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', 4.2, true),
('Meva salatasi', 'Fruit Salad', 'Фруктовый салат', 'Yangi meva salatasi', 'Fresh fruit salad', 'Свежий фруктовый салат', 8.00, 'snacks', 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7', 4.5, true),
('Hummus', 'Hummus with Bread', 'Хумус с хлебом', 'Non bilan hummus', 'Hummus served with bread', 'Хумус подается с хлебом', 6.50, 'snacks', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', 4.3, true),
('Bruschetta', 'Italian Bruschetta', 'Итальянская брускетта', 'Italyan bruschetta', 'Italian style bruschetta', 'Брускетта в итальянском стиле', 7.50, 'snacks', 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550', 4.6, true),

-- Soups (10 items)
('Borsch', 'Ukrainian Borscht', 'Украинский борщ', 'Ukraina borsch sho''rvasi', 'Traditional Ukrainian borscht soup', 'Традиционный украинский борщ', 12.00, 'soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd', 4.7, true),
('Sho''rva', 'Traditional Soup', 'Традиционный суп', 'An''anaviy o''zbek sho''rvasi', 'Traditional Uzbek soup', 'Традиционный узбекский суп', 10.00, 'soups', 'https://images.unsplash.com/photo-1551218808-94e220e084d2', 4.5, true),
('Tovuq sho''rvasi', 'Chicken Soup', 'Куриный суп', 'Tovuq go''shti sho''rvasi', 'Hearty chicken soup', 'Сытный куриный суп', 11.00, 'soups', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', 4.6, true),
('Mushroom soup', 'Mushroom Cream Soup', 'Грибной крем-суп', 'Qo''ziqorin kremi sho''rvasi', 'Creamy mushroom soup', 'Кремовый грибной суп', 13.00, 'soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd', 4.8, true),
('Tomato soup', 'Tomato Soup', 'Томатный суп', 'Pomidor sho''rvasi', 'Rich tomato soup', 'Богатый томатный суп', 9.50, 'soups', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890', 4.4, true),
('Lentil soup', 'Lentil Soup', 'Чечевичный суп', 'Yasmiq sho''rvasi', 'Healthy lentil soup', 'Здоровый чечевичный суп', 10.50, 'soups', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', 4.5, true),
('Minestrone', 'Italian Minestrone', 'Итальянский минестроне', 'Italyan minestrone sho''rvasi', 'Italian vegetable soup', 'Итальянский овощной суп', 11.50, 'soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd', 4.6, true),
('Fish soup', 'Fish Soup', 'Рыбный суп', 'Baliq sho''rvasi', 'Fresh fish soup', 'Свежий рыбный суп', 14.00, 'soups', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890', 4.7, true),
('Pumpkin soup', 'Pumpkin Soup', 'Тыквенный суп', 'Qovoq sho''rvasi', 'Creamy pumpkin soup', 'Кремовый тыквенный суп', 12.50, 'soups', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', 4.5, true),
('Noodle soup', 'Noodle Soup', 'Суп с лапшой', 'Lagmon sho''rvasi', 'Traditional noodle soup', 'Традиционный суп с лапшой', 11.00, 'soups', 'https://images.unsplash.com/photo-1547592166-23ac45744acd', 4.4, true);
