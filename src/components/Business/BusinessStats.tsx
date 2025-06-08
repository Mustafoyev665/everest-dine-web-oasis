
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, ShoppingBag, Star } from 'lucide-react';

const BusinessStats = () => {
  const stats = [
    {
      title: "Kunlik daromad",
      value: "$850",
      change: "+12%",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Faol mijozlar",
      value: "1,240",
      change: "+8%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Bugungi buyurtmalar",
      value: "47",
      change: "+23%",
      icon: ShoppingBag,
      color: "text-purple-500"
    },
    {
      title: "O'rtacha reyting",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className={`text-xs ${stat.color} mt-1`}>
              {stat.change} o'tgan oydan
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessStats;
