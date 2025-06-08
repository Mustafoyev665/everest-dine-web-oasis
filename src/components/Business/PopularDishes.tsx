
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PopularDishes = () => {
  const dishes = [
    {
      name: "Lag'mon",
      orders: 47,
      revenue: "$235",
      trend: "up"
    },
    {
      name: "Plov",
      orders: 42,
      revenue: "$210",
      trend: "up"
    },
    {
      name: "Manti",
      orders: 38,
      revenue: "$190",
      trend: "down"
    },
    {
      name: "Shashlik",
      orders: 35,
      revenue: "$175",
      trend: "up"
    },
    {
      name: "Naryn",
      orders: 28,
      revenue: "$140",
      trend: "stable"
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white">Mashhur taomlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dishes.map((dish, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{dish.name}</p>
                <p className="text-gray-400 text-sm">{dish.orders} buyurtma</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold">{dish.revenue}</p>
                <Badge 
                  variant={dish.trend === 'up' ? 'default' : dish.trend === 'down' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {dish.trend === 'up' ? '↗' : dish.trend === 'down' ? '↘' : '→'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularDishes;
