
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShoppingContext } from '@/context/ShoppingContext';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemsCount, likedItemsCount } = useShoppingContext();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Reservations', href: '/reservations' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              Everest Rest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Liked */}
            <Link to="/liked" className="relative">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Heart className="w-5 h-5" />
                {likedItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-400 text-slate-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {likedItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-300 text-sm">Hello, {user.email}</span>
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <User className="w-4 h-4 mr-1" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 rounded-lg mt-2 border border-white/10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-white/10 pt-3 mt-3">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2 inline" />
                    Logout
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2 inline" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-3 py-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
