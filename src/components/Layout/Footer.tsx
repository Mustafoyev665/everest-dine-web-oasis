
import React from 'react';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-display font-bold text-xl">E</span>
              </div>
              <div>
                <span className="font-display text-2xl font-bold gradient-text">Everest Rest</span>
                <p className="text-xs text-gray-400 -mt-1">{t('footer.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'Twitter', 'TikTok'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all duration-200"
                >
                  <span className="text-sm font-semibold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-xl font-semibold gradient-text mb-6">{t('footer.contact_title')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <p className="text-white font-medium">{t('footer.address_label')}</p>
                  <p className="text-gray-400 text-sm">{t('footer.address')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <p className="text-white font-medium">{t('footer.phone_label')}</p>
                  <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 mt-1" />
                <div>
                  <p className="text-white font-medium">{t('footer.email_label')}</p>
                  <p className="text-gray-400 text-sm">hello@everestrest.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Links */}
          <div>
            <h3 className="font-display text-xl font-semibold gradient-text mb-6">{t('footer.hours_title')}</h3>
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">{t('footer.weekdays')}</span>
              </div>
              <p className="text-gray-400 text-sm ml-6">5:00 PM - 10:00 PM</p>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">{t('footer.weekends')}</span>
              </div>
              <p className="text-gray-400 text-sm ml-6">5:00 PM - 11:00 PM</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium mb-3">{t('footer.quick_links')}</h4>
              {[
                { key: 'nav.menu', href: '/menu' },
                { key: 'nav.reservations', href: '/reservations' },
                { key: 'footer.private_events', href: '#' },
                { key: 'footer.gift_cards', href: '#' },
                { key: 'footer.careers', href: '#' }
              ].map((link) => (
                <a 
                  key={link.key}
                  href={link.href} 
                  className="block text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>{t('footer.made_with')}</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>{t('footer.made_in')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
