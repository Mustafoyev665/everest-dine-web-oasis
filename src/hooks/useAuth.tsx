
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth event:', event, 'Session:', session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Ro'yxatdan o'tganda avtomatik welcome toast ko'rsatish
        if (event === 'SIGNED_UP' && session?.user) {
          toast({
            title: "Hisob muvaffaqiyatli yaratildi!",
            description: "Everest Rest ga xush kelibsiz. Endi saytdan to'liq foydalanishingiz mumkin.",
          });
        }

        if (event === 'SIGNED_IN' && session?.user) {
          toast({
            title: "Tizimga muvaffaqiyatli kirdingiz!",
            description: "Xush kelibsiz!",
          });
        }
      }
    );

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
      
      // Admin email uchun maxsus ishlov
      if (email === 'mustafoyev7788@gmail.com') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) {
          // Agar admin allaqachon mavjud bo'lsa, login qilish
          if (error.message.includes('User already registered')) {
            await signIn(email, password);
            return;
          }
          throw error;
        }

        if (data.user) {
          toast({
            title: "Admin hisob yaratildi!",
            description: "Admin sifatida tizimga kirdingiz.",
          });
        }
        return;
      }

      // Oddiy foydalanuvchilar uchun
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) {
        throw error;
      }

      // Avtomatik login - email tasdiqlash talab qilinmaydi
      if (data.user && !data.session) {
        // Foydalanuvchi yaratildi lekin session yo'q, avtomatik login qilish
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          console.error('Auto login error:', signInError);
          toast({
            title: "Hisob yaratildi!",
            description: "Iltimos login sahifasiga o'ting va tizimga kiring.",
          });
        }
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
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Noto'g'ri ma'lumotlar",
            description: "Email yoki parolni tekshiring.",
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
