
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Reservation {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  special_requests: string;
  status: string;
  created_at: string;
}

const AdminReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setReservations(data);
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Bronlarni yuklashda xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (reservationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', reservationId);

      if (error) throw error;

      setReservations(reservations.map(reservation => 
        reservation.id === reservationId ? { ...reservation, status } : reservation
      ));

      toast({
        title: "Muvaffaqiyat",
        description: "Bron statusi yangilandi"
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Status yangilanmadi",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      pending: "outline",
      confirmed: "default",
      cancelled: "destructive"
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
        <h1 className="text-3xl font-bold text-white mb-2">Bronlar</h1>
        <p className="text-gray-400">Stol bronlarini boshqaring</p>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <Card key={reservation.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">{reservation.customer_name}</CardTitle>
                  <p className="text-gray-400">{reservation.customer_email}</p>
                  <p className="text-gray-400">{reservation.customer_phone}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(reservation.status)}
                  <p className="text-yellow-400 font-bold mt-2">
                    {reservation.party_size} kishi
                  </p>
                  <p className="text-gray-400 text-sm">
                    {new Date(reservation.created_at).toLocaleDateString('uz-UZ')}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-gray-300">
                  <strong>Sana:</strong> {reservation.reservation_date}
                </p>
                <p className="text-gray-300">
                  <strong>Vaqt:</strong> {reservation.reservation_time}
                </p>
                {reservation.special_requests && (
                  <p className="text-gray-300">
                    <strong>Maxsus so'rovlar:</strong> {reservation.special_requests}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Tasdiqlash
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Bekor qilish
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReservations;
