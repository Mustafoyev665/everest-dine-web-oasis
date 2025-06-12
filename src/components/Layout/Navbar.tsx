
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, Heart, User, LogOut } from 'lucide-react';
import { useShoppingContext } from '@/context/ShoppingContext';
import { useAuth } from '@/hooks/useAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems, likedItems } = useShoppingContext();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const likedItemsCount = likedItems.length;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const NavLinks = ({ onClose }: { onClose?: () => void }) => (
    <>
      <Link
        to="/"
        className="text-white hover:text-cyan-400 transition-colors font-medium"
        onClick={onClose}
      >
        Home
      </Link>
      <Link
        to="/about"
        className="text-white hover:text-cyan-400 transition-colors font-medium"
        onClick={onClose}
      >
        About
      </Link>
      <Link
        to="/menu"
        className="text-white hover:text-cyan-400 transition-colors font-medium"
        onClick={onClose}
      >
        Menu
      </Link>
      <Link
        to="/reservations"
        className="text-white hover:text-cyan-400 transition-colors font-medium"
        onClick={onClose}
      >
        Reservations
      </Link>
      <Link
        to="/contact"
        className="text-white hover:text-cyan-400 transition-colors font-medium"
        onClick={onClose}
      >
        Contact
      </Link>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-display font-bold gradient-text">
              Restaurant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart & Liked Items */}
            <div className="flex items-center space-x-2">
              <Link to="/liked" className="relative">
                <Button variant="ghost" size="sm" className="text-white hover:text-pink-400">
                  <Heart className="w-5 h-5" />
                  {likedItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {likedItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="sm" className="text-white hover:text-cyan-400">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-cyan-400">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card border-white/10">
                  <DropdownMenuItem className="text-white focus:text-cyan-400">
                    <User className="w-4 h-4 mr-2" />
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-white focus:text-red-400 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:text-cyan-400">
                    Kirish
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 hover:from-cyan-500 hover:to-purple-600">
                    Ro'yxatdan o'tish
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-white">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-white/10">
                <div className="flex flex-col space-y-6 mt-6">
                  <NavLinks onClose={() => setIsOpen(false)} />
                  
                  {!user && (
                    <div className="flex flex-col space-y-2 pt-4">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-white hover:text-cyan-400">
                          Kirish
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 hover:from-cyan-500 hover:to-purple-600">
                          Ro'yxatdan o'tish
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
