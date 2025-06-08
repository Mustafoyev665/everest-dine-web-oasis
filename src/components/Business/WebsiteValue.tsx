
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useWebsiteValue } from '@/hooks/useWebsiteValue';
import { 
  DollarSign, 
  Code, 
  Layers, 
  Clock, 
  TrendingUp,
  Award,
  Zap,
  Shield
} from 'lucide-react';

const WebsiteValue = () => {
  const { metrics, valueBreakdown, isLoading, calculateValue } = useWebsiteValue();

  const highlights = [
    {
      icon: Code,
      title: "Komponentlar",
      value: metrics.totalComponents,
      color: "text-blue-500"
    },
    {
      icon: Layers,
      title: "Sahifalar",
      value: metrics.totalPages,
      color: "text-green-500"
    },
    {
      icon: Zap,
      title: "Xususiyatlar",
      value: metrics.totalFeatures,
      color: "text-purple-500"
    },
    {
      icon: Clock,
      title: "Ishlab chiqish (soat)",
      value: metrics.developmentHours,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-3 rounded-full font-bold text-lg mb-4">
          <Award className="w-6 h-6" />
          Premium Website Baholash
        </div>
        <h2 className="text-4xl font-display font-bold gradient-text mb-4">
          Sayt qiymati: ${metrics.marketValue.toLocaleString()}
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Professional darajadagi restoran websayt platformasi - to'liq tayyor biznes uchun
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((item, index) => (
          <Card key={index} className="glass-card text-center">
            <CardContent className="p-4">
              <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="text-sm text-gray-400">{item.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Value Breakdown */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-yellow-400" />
            Qiymat tarkibi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {valueBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.category}</span>
                  <span className="text-yellow-400 font-bold">${item.value}</span>
                </div>
                <Progress 
                  value={(item.value / metrics.marketValue) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500">
                  {item.hours} soat × ${item.rate}/soat
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack Value */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Texnologiya to'plami</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">React + TypeScript</span>
                <Badge variant="secondary">$1,200</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Supabase Backend</span>
                <Badge variant="secondary">$800</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Admin Panel</span>
                <Badge variant="secondary">$1,500</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Authentication</span>
                <Badge variant="secondary">$600</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">UI/UX Design</span>
                <Badge variant="secondary">$900</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Enterprise Xususiyatlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">To'liq responsiv dizayn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Real-time ma'lumotlar sinxronizatsiyasi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Masshtablanadigan arxitektura</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">SEO optimizatsiya</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Xavfsizlik protokollari</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Professional kod sifati</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Comparison */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Bozor taqqoslash
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Oddiy sayt</div>
              <div className="text-xl font-bold text-red-400">$2,000-4,000</div>
              <div className="text-xs text-gray-500">Asosiy funksiyalar</div>
            </div>
            <div className="text-center p-4 border-2 border-yellow-400 rounded-lg bg-yellow-400/10">
              <div className="text-sm text-gray-400 mb-1">Ushbu sayt</div>
              <div className="text-2xl font-bold text-yellow-400">${metrics.marketValue.toLocaleString()}</div>
              <div className="text-xs text-yellow-300">Enterprise darajasi</div>
            </div>
            <div className="text-center p-4 border border-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Katta agentlik</div>
              <div className="text-xl font-bold text-blue-400">$15,000+</div>
              <div className="text-xs text-gray-500">Uzoq vaqt</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="glass-card max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎯 Biznes uchun tayyor!
            </h3>
            <p className="text-gray-300 mb-6">
              Ushbu sayt to'liq ishlaydi va darhol biznes yurita boshlash mumkin. 
              Barcha zamonaviy funksiyalar, professional dizayn va enterprise 
              darajasidagi kod sifati.
            </p>
            <Button 
              onClick={calculateValue}
              disabled={isLoading}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-bold"
            >
              {isLoading ? 'Hisoblanmoqda...' : 'Qiymatni qayta hisoblash'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebsiteValue;
