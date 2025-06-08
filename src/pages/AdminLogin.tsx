
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';

const formSchema = z.object({
  email: z.string().email({ message: 'To\'g\'ri email manzilini kiriting.' }),
  password: z.string().min(1, { message: 'Parol kiritish majburiy.' }),
});

type FormData = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, user, isAdmin, loading } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'mustafoyev7788@gmail.com',
      password: '12345678!@WEB',
    },
  });

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard');
    } else if (user && !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);
  
  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data.email, data.password);
      if (data.email === 'mustafoyev7788@gmail.com') {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Admin login error:', error);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-display font-bold gradient-text mb-2">
            Admin Panel
          </h1>
          <p className="text-gray-400">
            Buyurtmalarni boshqarish uchun tizimga kiring
          </p>
        </div>
        
        <div className="glass-card p-8 animate-fade-in-up">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Admin Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="admin@email.com" 
                        className="bg-white/5 border-white/10 text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Parol</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          className="bg-white/5 border-white/10 text-white pr-10" 
                          {...field} 
                        />
                        <button 
                          type="button" 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className="text-red-500 text-sm text-center">
                  {form.formState.errors.root.message}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Kirish
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-center text-sm text-gray-400">
              <p className="mb-2">Demo ma'lumotlar:</p>
              <p>Email: mustafoyev7788@gmail.com</p>
              <p>Parol: 12345678!@WEB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
