
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  CreditCard, 
  Truck, 
  Shield, 
  Clock, 
  Users,
  Star,
  MessageSquare,
  BarChart3,
  Settings
} from 'lucide-react';

const AdvancedFeatures = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobil ilovalar",
      description: "iOS va Android uchun to'liq funksional ilovalar",
      status: "Tayyor",
      color: "bg-green-500"
    },
    {
      icon: CreditCard,
      title: "To'lov tizimlari",
      description: "Payme, Click, Uzcard va xalqaro kartalar",
      status: "Faol",
      color: "bg-blue-500"
    },
    {
      icon: Truck,
      title: "Yetkazib berish",
      description: "Real vaqtda kuzatuv va GPS navigatsiya",
      status: "Ishlamoqda",
      color: "bg-purple-500"
    },
    {
      icon: Shield,
      title: "Xavfsizlik",
      description: "SSL shifrlash va ma'lumotlar himoyasi",
      status: "Himoyalangan",
      color: "bg-green-600"
    },
    {
      icon: Clock,
      title: "24/7 xizmat",
      description: "Doimo ishlayotgan mijozlar xizmati",
      status: "Faol",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "CRM tizimi",
      description: "Mijozlar bilan ishlash va sadoqat dasturi",
      status: "Integratsiya",
      color: "bg-indigo-500"
    },
    {
      icon: Star,
      title: "Reyting tizimi",
      description: "Taomlar va xizmat sifatini baholash",
      status: "Faol",
      color: "bg-yellow-500"
    },
    {
      icon: MessageSquare,
      title: "Chat bot",
      description: "AI asosida mijozlar bilan muloqot",
      status: "Beta",
      color: "bg-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Analitika",
      description: "Biznes ko'rsatkichlari va hisobotlar",
      status: "Tahlil",
      color: "bg-red-500"
    },
    {
      icon: Settings,
      title: "API integratsiya",
      description: "Tashqi xizmatlar bilan bog'lanish",
      status: "Moslashuv",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold gradient-text mb-4">
          Professional Xususiyatlar
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Zamonaviy restoran biznesini yuritish uchun barcha kerakli vositalar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {feature.status}
                </Badge>
              </div>
              <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Card className="glass-card max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 Enterprise Tayyor Sayt
            </h3>
            <p className="text-gray-300 mb-6">
              Ushbu sayt professional restoran biznesini yuritish uchun barcha zamonaviy 
              texnologiyalar bilan jihozlangan. 100+ komponent, to'liq backend va 
              skalabilitetga ega arxitektura.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge className="bg-green-500">Tayyor ishlatish uchun</Badge>
              <Badge className="bg-blue-500">Masshtablanadigan</Badge>
              <Badge className="bg-purple-500">Professional</Badge>
              <Badge className="bg-yellow-500">$10,000+ qiymat</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedFeatures;
