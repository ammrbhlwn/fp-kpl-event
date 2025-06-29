"use client";

import { useEffect, useState } from "react";
import { createClient } from '../../../supabase/client';
import { format } from 'date-fns';

interface MyTicket {
  id: number;
  eventId: number;
  ticketId: number;
  types: string;
  quantity: number;
  userId: string;
  status: string;
  purchasedDate: string;
  totalPrice: number;
}

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<MyTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const supabase = createClient();

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ambil user email
        const { data } = await supabase.auth.getUser();
        setUserEmail(data?.user?.email || '');
        // Fetch tiket user
        const res = await fetch("/api/myticket");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Gagal fetch tiket');
        setTickets(json.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '//login';
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded mb-4">Logout</button>
      <h1 className="text-2xl font-bold mb-4">Tiket Saya</h1>
      {userEmail && <div className="mb-4 text-green-700">Login sebagai: <b>{userEmail}</b></div>}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && tickets.length === 0 && (
        <div className="text-gray-600">Belum ada tiket yang kamu pesan.</div>
      )}
      {!loading && !error && tickets.length > 0 && (
        <ul className="space-y-4">
          {tickets.map(ticket => (
            <li key={ticket.id} className="border rounded p-4 bg-gray-50">
              <div><b>Event ID:</b> {ticket.eventId}</div>
              <div><b>Tipe Tiket:</b> {ticket.types}</div>
              <div><b>Jumlah:</b> {ticket.quantity}</div>
              <div><b>Status:</b> {ticket.status}</div>
              <div>
                <b>Tanggal Beli:</b>{" "}
                {ticket.purchasedDate
                  ? format(new Date(ticket.purchasedDate + 'T00:00:00'), 'dd MMMM yyyy')
                  : "-"}
              </div>
              <div><b>Total Harga:</b> Rp {ticket.totalPrice.toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 