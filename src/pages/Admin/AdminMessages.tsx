
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setMessages(data);
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Xabarlarni yuklashda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.map(message => 
        message.id === messageId ? { ...message, status: 'read' } : message
      ));

      toast({
        title: "Muvaffaqiyat",
        description: "Xabar o'qilgan deb belgilandi"
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Xabar holati yangilanmadi",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      unread: "destructive",
      read: "default"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Xabarlar</h1>
        <p className="text-gray-400">Mijozlardan kelgan xabarlar</p>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">{message.name}</CardTitle>
                  <p className="text-gray-400">{message.email}</p>
                  {message.phone && <p className="text-gray-400">{message.phone}</p>}
                </div>
                <div className="text-right">
                  {getStatusBadge(message.status)}
                  <p className="text-gray-400 text-sm mt-2">
                    {new Date(message.created_at).toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {message.subject && (
                <p className="text-gray-300 mb-2">
                  <strong>Mavzu:</strong> {message.subject}
                </p>
              )}
              <p className="text-gray-300 mb-4">{message.message}</p>
              {message.status === 'unread' && (
                <Button 
                  size="sm" 
                  onClick={() => markMessageAsRead(message.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  O'qilgan deb belgilash
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
