
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  isAdmin: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === 'mustafoyev7788@gmail.com';

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        throw error;
      }

      // Check if user was created and confirmed automatically
      if (data.user && data.session) {
        toast({
          title: "Hisob yaratildi!",
          description: "Siz muvaffaqiyatli tizimga kirdingiz.",
        });
        return;
      }

      // If email confirmation is enabled
      if (data.user && !data.session) {
        toast({
          title: "Hisob yaratildi!",
          description: "Hisobingizni tasdiqlash uchun emailingizni tekshiring.",
        });
        return;
      }

    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Ro'yxatdan o'tishda xatolik",
        description: error.message || "Ro'yxatdan o'tishda xatolik yuz berdi",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Attempting login for:', email);
      
      // Admin uchun maxsus tekshirish
      if (email === 'mustafoyev7788@gmail.com') {
        console.log('Admin login attempt');
        
        // Avval admin foydalanuvchini yaratishga harakat qilamiz
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: 'Admin User',
            }
          }
        });

        // Agar foydalanuvchi allaqachon mavjud bo'lsa, kirish
        if (signUpError && signUpError.message.includes('User already registered')) {
          console.log('Admin user exists, trying to sign in');
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            // Agar parol noto'g'ri bo'lsa, foydalanuvchini yangilaymiz
            if (error.message.includes('Invalid login credentials')) {
              console.log('Updating admin password');
              
              // Admin parolini yangilash uchun reset password qilamiz
              const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/login`
              });
              
              if (!resetError) {
                toast({
                  title: "Parol yangilash",
                  description: "Emailingizga parolni yangilash havolasi yuborildi.",
                  variant: "destructive",
                });
                return;
              }
            }
            throw error;
          }

          if (data.user) {
            toast({
              title: "Admin panel",
              description: "Admin sifatida tizimga muvaffaqiyatli kirdingiz.",
            });
            return;
          }
        } else if (!signUpError && signUpData.user) {
          // Yangi admin foydalanuvchi yaratildi
          console.log('New admin user created');
          toast({
            title: "Admin panel",
            description: "Admin hisobi yaratildi va tizimga kirdingiz.",
          });
          return;
        } else if (signUpError) {
          console.error('Admin signup error:', signUpError);
          throw signUpError;
        }
      }

      // Oddiy foydalanuvchilar uchun
      console.log('Regular user login attempt');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email tasdiqlanmagan",
            description: "Tizimga kirishdan oldin emailingizni tasdiqlang.",
            variant: "destructive",
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Noto'g'ri ma'lumotlar",
            description: "Email yoki parolni tekshiring. Agar hisob mavjud bo'lmasa, avval ro'yxatdan o'ting.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Tizimga kirishda xatolik",
            description: error.message,
            variant: "destructive",
          });
        }
        throw error;
      }

      if (data.user && data.session) {
        console.log('Login successful');
        toast({
          title: "Muvaffaqiyatli kirildi!",
          description: "Everest Rest ga xush kelibsiz.",
        });
      }

    } catch (error: any) {
      console.error('Signin error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }

      toast({
        title: "Tizimdan chiqildi",
        description: "Siz muvaffaqiyatli tizimdan chiqdingiz.",
      });
    } catch (error: any) {
      console.error('Signout error:', error);
      toast({
        title: "Tizimdan chiqishda xatolik",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
