
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const data = [
    { name: 'Dush', revenue: 1200 },
    { name: 'Sesh', revenue: 1900 },
    { name: 'Chor', revenue: 1400 },
    { name: 'Pay', revenue: 2200 },
    { name: 'Juma', revenue: 2800 },
    { name: 'Shan', revenue: 3200 },
    { name: 'Yak', revenue: 2900 },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white">Haftalik daromad</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#FCD34D" 
              strokeWidth={3}
              dot={{ fill: '#FCD34D', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
