
import { supabase } from '@/integrations/supabase/client';

interface MenuItemData {
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

export const seedMenuItems: MenuItemData[] = [
  // Main dishes (10 items)
  {
    name_uz: "Plov",
    name_en: "Pilaf",
    name_ru: "Плов",
    description_uz: "An'anaviy o'zbek plovi",
    description_en: "Traditional Uzbek pilaf",
    description_ru: "Традиционный узбекский плов",
    price: 12.99,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.8,
    is_active: true
  },
  {
    name_uz: "Manti",
    name_en: "Steamed Dumplings",
    name_ru: "Манты",
    description_uz: "Bug'da pishirilgan chuchvara",
    description_en: "Steamed meat dumplings",
    description_ru: "Паровые мясные пельмени",
    price: 9.99,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.7,
    is_active: true
  },
  {
    name_uz: "Lag'mon",
    name_en: "Hand-pulled Noodles",
    name_ru: "Лагман",
    description_uz: "Qo'lda tortilgan noodle",
    description_en: "Hand-pulled noodles with meat and vegetables",
    description_ru: "Лапша ручной работы с мясом и овощами",
    price: 11.50,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.6,
    is_active: true
  },
  {
    name_uz: "Sho'rva",
    name_en: "Beef Stew",
    name_ru: "Шурпа",
    description_uz: "Go'sht va sabzavotli sho'rva",
    description_en: "Hearty beef and vegetable stew",
    description_ru: "Сытное рагу из говядины с овощами",
    price: 10.99,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.5,
    is_active: true
  },
  {
    name_uz: "Kebab",
    name_en: "Grilled Kebab",
    name_ru: "Шашлык",
    description_uz: "Panjara ustida pishirilgan kebab",
    description_en: "Grilled meat skewers",
    description_ru: "Шашлык на гриле",
    price: 13.99,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.9,
    is_active: true
  },
  {
    name_uz: "Mastava",
    name_en: "Rice Soup",
    name_ru: "Мастава",
    description_uz: "Guruch va go'sht sho'rvasi",
    description_en: "Rice and meat soup",
    description_ru: "Суп с рисом и мясом",
    price: 8.99,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.4,
    is_active: true
  },
  {
    name_uz: "Norin",
    name_en: "Cold Noodle Dish",
    name_ru: "Норин",
    description_uz: "Sovuq noodle taomi",
    description_en: "Cold noodle dish with horse meat",
    description_ru: "Холодное блюдо из лапши с кониной",
    price: 14.99,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.3,
    is_active: true
  },
  {
    name_uz: "Jiz",
    name_en: "Grilled Liver",
    name_ru: "Жиз",
    description_uz: "Panjara ustida pishirilgan jigar",
    description_en: "Grilled liver with onions",
    description_ru: "Жареная печень с луком",
    price: 7.99,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.2,
    is_active: true
  },
  {
    name_uz: "Dimlama",
    name_en: "Steamed Vegetables",
    name_ru: "Димлама",
    description_uz: "Bug'da pishirilgan sabzavotlar",
    description_en: "Steamed vegetables and meat",
    description_ru: "Тушеные овощи с мясом",
    price: 10.50,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.6,
    is_active: true
  },
  {
    name_uz: "Qovurma",
    name_en: "Fried Meat",
    name_ru: "Ковурма",
    description_uz: "Qovurilgan go'sht",
    description_en: "Fried meat with vegetables",
    description_ru: "Жареное мясо с овощами",
    price: 12.50,
    category: "main",
    image: "/placeholder.svg",
    rating: 4.5,
    is_active: true
  },
  
  // Desserts (10 items)
  {
    name_uz: "Halva",
    name_en: "Halva",
    name_ru: "Халва",
    description_uz: "An'anaviy o'zbek halvasi",
    description_en: "Traditional Uzbek halva",
    description_ru: "Традиционная узбекская халва",
    price: 4.99,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.7,
    is_active: true
  },
  {
    name_uz: "Chak-chak",
    name_en: "Chak-chak",
    name_ru: "Чак-чак",
    description_uz: "Asal bilan qoplangan shirinlik",
    description_en: "Honey-coated sweet treat",
    description_ru: "Сладость, покрытая медом",
    price: 3.99,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.6,
    is_active: true
  },
  {
    name_uz: "Parvareda",
    name_en: "Parvareda",
    name_ru: "Парварда",
    description_uz: "Kristal shakar shirinligi",
    description_en: "Crystal sugar candy",
    description_ru: "Кристаллическая сахарная конфета",
    price: 2.99,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.3,
    is_active: true
  },
  {
    name_uz: "Nisholda",
    name_en: "Nisholda",
    name_ru: "Нишальда",
    description_uz: "Oq ko'pikli shirinlik",
    description_en: "White fluffy sweet",
    description_ru: "Белая пушистая сладость",
    price: 3.50,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.4,
    is_active: true
  },
  {
    name_uz: "Baklava",
    name_en: "Baklava",
    name_ru: "Пахлава",
    description_uz: "Yong'oq va asal bilan qoplangan",
    description_en: "Layered pastry with nuts and honey",
    description_ru: "Слоеная выпечка с орехами и медом",
    price: 5.99,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.8,
    is_active: true
  },
  {
    name_uz: "Sumalak",
    name_en: "Sumalak",
    name_ru: "Сумалак",
    description_uz: "Navrozboyram shirinligi",
    description_en: "Nowruz sweet pudding",
    description_ru: "Новрузская сладкая каша",
    price: 4.50,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.2,
    is_active: true
  },
  {
    name_uz: "Navvot",
    name_en: "Rock Sugar",
    name_ru: "Наввот",
    description_uz: "Qattiq shakar",
    description_en: "Crystallized sugar candy",
    description_ru: "Кристаллизованная сахарная конфета",
    price: 2.50,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.1,
    is_active: true
  },
  {
    name_uz: "Kulcha",
    name_en: "Sweet Bread",
    name_ru: "Кульча",
    description_uz: "Shirin non",
    description_en: "Sweet traditional bread",
    description_ru: "Сладкий традиционный хлеб",
    price: 3.99,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.5,
    is_active: true
  },
  {
    name_uz: "Chocolate Cake",
    name_en: "Chocolate Cake",
    name_ru: "Шоколадный торт",
    description_uz: "Shokolad torti",
    description_en: "Rich chocolate layer cake",
    description_ru: "Богатый шоколадный слоеный торт",
    price: 6.99,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.9,
    is_active: true
  },
  {
    name_uz: "Ice Cream",
    name_en: "Ice Cream",
    name_ru: "Мороженое",
    description_uz: "Muzqaymoq",
    description_en: "Vanilla ice cream with toppings",
    description_ru: "Ванильное мороженое с добавками",
    price: 3.50,
    category: "desserts",
    image: "/placeholder.svg",
    rating: 4.6,
    is_active: true
  },

  // Beverages (10 items)
  {
    name_uz: "Ko'k choy",
    name_en: "Green Tea",
    name_ru: "Зеленый чай",
    description_uz: "An'anaviy yashil choy",
    description_en: "Traditional green tea",
    description_ru: "Традиционный зеленый чай",
    price: 2.99,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.5,
    is_active: true
  },
  {
    name_uz: "Qora choy",
    name_en: "Black Tea",
    name_ru: "Черный чай",
    description_uz: "Kuchli qora choy",
    description_en: "Strong black tea",
    description_ru: "Крепкий черный чай",
    price: 2.50,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.3,
    is_active: true
  },
  {
    name_uz: "Ayron",
    name_en: "Ayran",
    name_ru: "Айран",
    description_uz: "Yogurt ichimlik",
    description_en: "Salted yogurt drink",
    description_ru: "Соленый йогуртовый напиток",
    price: 3.50,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.4,
    is_active: true
  },
  {
    name_uz: "Kompot",
    name_en: "Fruit Compote",
    name_ru: "Компот",
    description_uz: "Mevali kompot",
    description_en: "Mixed fruit compote",
    description_ru: "Компот из смешанных фруктов",
    price: 4.99,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.6,
    is_active: true
  },
  {
    name_uz: "Fresh Orange Juice",
    name_en: "Fresh Orange Juice",
    name_ru: "Свежий апельсиновый сок",
    description_uz: "Yangi apelsin sharbati",
    description_en: "Freshly squeezed orange juice",
    description_ru: "Свежевыжатый апельсиновый сок",
    price: 5.99,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.8,
    is_active: true
  },
  {
    name_uz: "Qahva",
    name_en: "Coffee",
    name_ru: "Кофе",
    description_uz: "Issiq qahva",
    description_en: "Hot brewed coffee",
    description_ru: "Горячий заваренный кофе",
    price: 3.99,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.7,
    is_active: true
  },
  {
    name_uz: "Cappuccino",
    name_en: "Cappuccino",
    name_ru: "Капучино",
    description_uz: "Sut ko'pikli qahva",
    description_en: "Coffee with steamed milk foam",
    description_ru: "Кофе с молочной пеной",
    price: 4.99,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.9,
    is_active: true
  },
  {
    name_uz: "Mineralny suv",
    name_en: "Mineral Water",
    name_ru: "Минеральная вода",
    description_uz: "Gazli mineral suv",
    description_en: "Sparkling mineral water",
    description_ru: "Газированная минеральная вода",
    price: 2.99,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.2,
    is_active: true
  },
  {
    name_uz: "Limonad",
    name_en: "Lemonade",
    name_ru: "Лимонад",
    description_uz: "Yangi limon sharbati",
    description_en: "Fresh lemonade",
    description_ru: "Свежий лимонад",
    price: 4.50,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.5,
    is_active: true
  },
  {
    name_uz: "Smoothie",
    name_en: "Fruit Smoothie",
    name_ru: "Фруктовый смузи",
    description_uz: "Mevali smoothie",
    description_en: "Mixed fruit smoothie",
    description_ru: "Смузи из смешанных фруктов",
    price: 6.50,
    category: "beverages",
    image: "/placeholder.svg",
    rating: 4.7,
    is_active: true
  },

  // Appetizers (10 items)
  {
    name_uz: "Achiq-chuchuk",
    name_en: "Fresh Salad",
    name_ru: "Ачик-чучук",
    description_uz: "Pomidor va piyoz salati",
    description_en: "Tomato and onion salad",
    description_ru: "Салат из помидоров и лука",
    price: 4.99,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.3,
    is_active: true
  },
  {
    name_uz: "Qatiq",
    name_en: "Yogurt",
    name_ru: "Катык",
    description_uz: "Uy qatiqi",
    description_en: "Homemade yogurt",
    description_ru: "Домашний йогурт",
    price: 3.50,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.4,
    is_active: true
  },
  {
    name_uz: "Non",
    name_en: "Bread",
    name_ru: "Лепешка",
    description_uz: "An'anaviy non",
    description_en: "Traditional flatbread",
    description_ru: "Традиционная лепешка",
    price: 2.99,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.6,
    is_active: true
  },
  {
    name_uz: "Tvorog",
    name_en: "Cottage Cheese",
    name_ru: "Творог",
    description_uz: "Tvorog bilan",
    description_en: "Fresh cottage cheese",
    description_ru: "Свежий творог",
    price: 4.50,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.2,
    is_active: true
  },
  {
    name_uz: "Piyola choy",
    name_en: "Tea Service",
    name_ru: "Чайный сервис",
    description_uz: "Choy va shirinliklar",
    description_en: "Tea with sweets",
    description_ru: "Чай со сладостями",
    price: 5.99,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.5,
    is_active: true
  },
  {
    name_uz: "Qoziqorin",
    name_en: "Mushrooms",
    name_ru: "Грибы",
    description_uz: "Qovurilgan qoziqorin",
    description_en: "Sautéed mushrooms",
    description_ru: "Жареные грибы",
    price: 6.99,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.4,
    is_active: true
  },
  {
    name_uz: "Bodring",
    name_en: "Cucumber Salad",
    name_ru: "Огурцы",
    description_uz: "Bodring salati",
    description_en: "Fresh cucumber salad",
    description_ru: "Салат из свежих огурцов",
    price: 3.99,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.1,
    is_active: true
  },
  {
    name_uz: "Sabzi",
    name_en: "Carrot Salad",
    name_ru: "Морковь по-корейски",
    description_uz: "Koreycha sabzi",
    description_en: "Korean-style carrot salad",
    description_ru: "Морковь по-корейски",
    price: 4.99,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.6,
    is_active: true
  },
  {
    name_uz: "Olcha",
    name_en: "Pickled Vegetables",
    name_ru: "Маринованные овощи",
    description_uz: "Turli xil tuzlangan sabzavotlar",
    description_en: "Assorted pickled vegetables",
    description_ru: "Ассорти из маринованных овощей",
    price: 5.50,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.3,
    is_active: true
  },
  {
    name_uz: "Cheese Platter",
    name_en: "Cheese Platter",
    name_ru: "Сырная тарелка",
    description_uz: "Turli xil pishloq",
    description_en: "Assorted cheese platter",
    description_ru: "Ассорти из сыров",
    price: 8.99,
    category: "appetizers",
    image: "/placeholder.svg",
    rating: 4.7,
    is_active: true
  }
];

export const insertSeedData = async () => {
  try {
    console.log('Starting to insert seed data...');
    
    for (const item of seedMenuItems) {
      const { error } = await supabase
        .from('menu_items')
        .insert(item);
      
      if (error) {
        console.error('Error inserting item:', item.name_en, error);
      } else {
        console.log('Successfully inserted:', item.name_en);
      }
    }
    
    console.log('Finished inserting seed data');
  } catch (error) {
    console.error('Error in insertSeedData:', error);
  }
};
