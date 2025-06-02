
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  // Restaurant history milestones
  const timeline = [
    {
      year: '2010',
      title: 'Humble Beginnings',
      description: 'Everest Rest opened its doors with a vision to bring authentic Nepalese cuisine to the heart of the city.'
    },
    {
      year: '2013',
      title: 'First Michelin Star',
      description: 'Recognition for our innovative fusion of traditional Nepalese flavors with modern culinary techniques.'
    },
    {
      year: '2016',
      title: 'Expansion',
      description: 'Opened our second location and launched our signature chef\'s table experience.'
    },
    {
      year: '2019',
      title: 'Second Michelin Star',
      description: 'Awarded our second Michelin star for exceptional cuisine and service excellence.'
    },
    {
      year: '2022',
      title: 'Sustainability Initiative',
      description: 'Launched our farm-to-table program and achieved carbon-neutral operations.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              About Our Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
              A culinary journey that began with passion and continues with excellence
            </p>
          </div>
        </div>
      </div>
      
      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="glass-card p-8 animate-fade-in-up">
            <h2 className="text-3xl font-display font-bold mb-6 text-black dark:text-white">Our Experience</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              At Everest Rest, we believe that dining is more than just a meal – it's an experience that engages all your senses. Founded in 2010, our restaurant has been dedicated to creating unforgettable culinary memories.
            </p>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
              Our master chefs combine traditional Nepalese cooking techniques with modern innovation, using only the finest locally-sourced ingredients to create dishes that tell a story.
            </p>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              Every plate that leaves our kitchen is a testament to our commitment to excellence, creativity, and the rich culinary heritage that inspires us every day.
            </p>
          </div>
          
          <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-yellow-400/20 to-amber-700/20 aspect-square w-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-slate-900 font-display font-bold text-6xl">E</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Chef's Portrait</h3>
                <p className="text-gray-700 dark:text-gray-400">Master Chef Rajesh Kumar</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mission & Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">
              Our Mission & Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-display font-bold mb-4 text-yellow-400">Vision</h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                To be the premier destination for authentic Nepalese cuisine, where tradition meets innovation in perfect harmony.
              </p>
            </div>
            
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-display font-bold mb-4 text-yellow-400">Mission</h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                To create exceptional dining experiences through passionate cooking, warm hospitality, and unwavering commitment to quality.
              </p>
            </div>
            
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-2xl font-display font-bold mb-4 text-yellow-400">Values</h3>
              <ul className="text-gray-800 dark:text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  Culinary Excellence
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  Sustainability
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  Innovation
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  Warm Hospitality
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-6">
              Our Journey
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300 dark:bg-white/10"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="w-1/2"></div>
                  
                  {/* Timeline point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center z-10">
                    <span className="text-slate-900 font-bold">{item.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-1/2 glass-card p-6 ${
                    index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                  }`}>
                    <h3 className="text-xl font-display font-bold mb-2 text-black dark:text-white">{item.title}</h3>
                    <p className="text-gray-800 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="glass-card p-12 text-center animate-fade-in-up">
          <h2 className="text-3xl font-display font-bold mb-6 text-black dark:text-white">Ready to Experience Excellence?</h2>
          <p className="text-gray-800 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join us for an unforgettable dining experience where every dish tells a story and every meal becomes a cherished memory.
          </p>
          <Button asChild className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold px-8 py-6 h-auto text-lg">
            <Link to="/reservations">Make a Reservation</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
