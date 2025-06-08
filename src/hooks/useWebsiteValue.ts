
import { useState, useEffect } from 'react';

interface WebsiteMetrics {
  totalComponents: number;
  totalPages: number;
  totalFeatures: number;
  developmentHours: number;
  marketValue: number;
  techStackValue: number;
}

export const useWebsiteValue = () => {
  const [metrics, setMetrics] = useState<WebsiteMetrics>({
    totalComponents: 85,
    totalPages: 15,
    totalFeatures: 45,
    developmentHours: 320,
    marketValue: 10000,
    techStackValue: 2500
  });

  const [isLoading, setIsLoading] = useState(false);

  const calculateValue = () => {
    setIsLoading(true);
    
    // Simulating calculation
    setTimeout(() => {
      const baseValue = metrics.developmentHours * 35; // $35/hour average
      const featureMultiplier = metrics.totalFeatures * 120;
      const techStackBonus = metrics.techStackValue;
      const complexityBonus = 1500; // For advanced features
      
      const totalValue = baseValue + featureMultiplier + techStackBonus + complexityBonus;
      
      setMetrics(prev => ({
        ...prev,
        marketValue: Math.round(totalValue)
      }));
      
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    calculateValue();
  }, []);

  const valueBreakdown = [
    {
      category: "Frontend Development",
      hours: 120,
      rate: 40,
      value: 4800
    },
    {
      category: "Backend & Database",
      hours: 80,
      rate: 45,
      value: 3600
    },
    {
      category: "UI/UX Design",
      hours: 60,
      rate: 35,
      value: 2100
    },
    {
      category: "Admin Panel",
      hours: 40,
      rate: 50,
      value: 2000
    },
    {
      category: "Authentication & Security",
      hours: 30,
      rate: 55,
      value: 1650
    },
    {
      category: "Testing & Optimization",
      hours: 25,
      rate: 40,
      value: 1000
    }
  ];

  return {
    metrics,
    valueBreakdown,
    isLoading,
    calculateValue
  };
};
