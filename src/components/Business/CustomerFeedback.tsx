
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

const CustomerFeedback = () => {
  const feedback = [
    {
      customer: "Aziz Karimov",
      rating: 5,
      comment: "Juda mazali taomlar, tez yetkazib berishdi!",
      time: "2 soat oldin"
    },
    {
      customer: "Madina Tosheva",
      rating: 4,
      comment: "Plov juda yaxshi edi, lekin biroz kech yetkazildi",
      time: "5 soat oldin"
    },
    {
      customer: "Bobur Aliyev",
      rating: 5,
      comment: "Manti shirinligi ajoyib! Tavsiya qilaman",
      time: "1 kun oldin"
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white">Mijozlar fikri</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedback.map((item, index) => (
            <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium">{item.customer}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-2">{item.comment}</p>
              <p className="text-gray-500 text-xs">{item.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerFeedback;
