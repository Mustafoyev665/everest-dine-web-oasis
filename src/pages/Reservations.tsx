
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Users, Clock, Send } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useOrderManagement } from '@/hooks/useOrderManagement';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Ism kamida 2 ta harf bo\'lishi kerak.' }),
  email: z.string().email({ message: 'To\'g\'ri email manzil kiriting.' }),
  phone: z.string().min(9, { message: 'Telefon raqam kiriting.' }),
  date: z.string().min(1, { message: 'Sanani tanlang.' }),
  time: z.string().min(1, { message: 'Vaqtni tanlang.' }),
  partySize: z.number().min(1, { message: 'Kamida 1 kishi bo\'lishi kerak.' }).max(20, { message: 'Maksimal 20 kishi.' }),
  specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Reservations = () => {
  const { submitReservation, loading } = useOrderManagement();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: user?.email || '',
      phone: '',
      date: '',
      time: '',
      partySize: 2,
      specialRequests: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await submitReservation({
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: data.date,
        time: data.time,
        partySize: data.partySize,
        specialRequests: data.specialRequests || undefined,
      });
      form.reset();
    } catch (error) {
      // Error handling is done in useOrderManagement
    }
  };

  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-4">Login talab qilinadi</h2>
              <p className="text-gray-400 mb-6">
                Stol bronlash uchun tizimga kirishingiz kerak.
              </p>
              <Button 
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
                onClick={() => navigate('/login')}
              >
                Tizimga kirish
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Stol bronlash
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Unutilmas kechada sizning stolingizni bronga oling
            </p>
          </div>
        </div>
      </div>
      
      {/* Reservation Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Reservation Form */}
          <div className="glass-card p-8 animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">Bron ma'lumotlari</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">To'liq ism</FormLabel>
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
                      <FormLabel className="text-gray-300">Telefon</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+998 90 123 45 67" className="bg-white/5 border-white/10 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Sana</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            min={minDate}
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
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Vaqt</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                            {...field}
                          >
                            <option value="">Vaqtni tanlang</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time} className="bg-slate-800">
                                {time}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="partySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Kishilar soni</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="20"
                          placeholder="2" 
                          className="bg-white/5 border-white/10 text-white" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Maxsus so'rovlar (ixtiyoriy)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tug'ilgan kun, maxsus diet, allergiya va boshqalar..." 
                          className="bg-white/5 border-white/10 text-white min-h-[100px]" 
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
                  Stol bronlash
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Information */}
          <div className="space-y-8">
            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-display font-bold mb-6">Bron qoidalari</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Oldindan bron</h3>
                    <p className="text-gray-400">Kamida 1 kun oldin bron qiling</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Tasdiqlash</h3>
                    <p className="text-gray-400">24 soat ichida tasdiqlash xabari keladi</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Users className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Katta guruhlar</h3>
                    <p className="text-gray-400">10+ kishi uchun alohida shartlar</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-display font-bold mb-6">Ish vaqti</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Dushanba - Payshanba</h3>
                  <p className="text-gray-400">17:00 - 22:00</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white">Juma - Yakshanba</h3>
                  <p className="text-gray-400">17:00 - 23:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Reservations;
