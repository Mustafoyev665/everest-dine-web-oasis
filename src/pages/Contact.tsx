
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, MapPin, Phone, Clock, Mail } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useOrderManagement } from '@/hooks/useOrderManagement';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Ism kamida 2 ta harf bo\'lishi kerak.' }),
  email: z.string().email({ message: 'To\'g\'ri email manzil kiriting.' }),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, { message: 'Xabar kamida 10 ta harf bo\'lishi kerak.' }),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const { submitContactMessage, loading } = useOrderManagement();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitContactMessage({
        name: data.name,
        email: data.email,
        message: data.message,
        phone: data.phone || undefined,
        subject: data.subject || undefined,
      });
      form.reset();
    } catch (error) {
      // Error handling is done in useOrderManagement
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Aloqa
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Bizga murojaat qiling, barcha savollaringizga javob berishga tayyormiz
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="glass-card p-8 animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">Bizga xabar yuboring</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Ism</FormLabel>
                      <FormControl>
                        <Input placeholder="Ismingiz" className="bg-white/5 border-white/10 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" className="bg-white/5 border-white/10 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Telefon (ixtiyoriy)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+998 90 123 45 67" className="bg-white/5 border-white/10 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Mavzu (ixtiyoriy)</FormLabel>
                      <FormControl>
                        <Input placeholder="Xabar mavzusi" className="bg-white/5 border-white/10 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Xabar</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Xabaringizni shu yerda yozing..." 
                          className="bg-white/5 border-white/10 text-white min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-slate-900 border-t-transparent rounded-full" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Xabar yuborish
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-display font-bold mb-6">Aloqa ma'lumotlari</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Manzil</h3>
                    <p className="text-gray-400">123 Summit Avenue<br />Manhattan, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Telefon</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <p className="text-gray-400">hello@everestrest.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-display font-bold mb-6">Ish vaqti</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Dushanba - Payshanba</h3>
                    <p className="text-gray-400">17:00 - 22:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Juma - Yakshanba</h3>
                    <p className="text-gray-400">17:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-16 glass-card p-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="aspect-video w-full bg-slate-800 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold mb-2">Interaktiv xarita tez orada</h3>
              <p className="text-gray-400">Sizning qulayligingiz uchun haqiqiy xaritani integratsiya qilmoqdamiz</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
