
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-300">Michelin-Starred Restaurant</span>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block gradient-text">Everest Rest</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-300 font-light mt-2">
              Nepalese Fine Dining Experience
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Immerse yourself in a culinary journey through the Himalayas with our award-winning dishes prepared by Master Chef Rajesh Kumar.
          </p>

          {/* Location and hours */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-5 h-5 text-yellow-400" />
              <span>123 Mountain View, Kathmandu Street</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span>Open daily: 11am - 10pm</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >
              Reserve a Table
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 font-semibold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-200"
            >
              View Our Menu
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-200">
                15+
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Years of Excellence
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-200">
                50K+
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Satisfied Guests
              </div>
            </div>
            <div className="text-center group">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-200">
                200+
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                Signature Dishes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
