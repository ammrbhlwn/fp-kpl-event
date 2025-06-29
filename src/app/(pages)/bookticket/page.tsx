'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../../supabase/client';

interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  types: string;
  capacity?: number;
  description?: string;
}

const ticketTypeMap: Record<string, ("Regular" | "VIP" | "VVIP")[]> = {
  Seminar: ["Regular", "VIP", "VVIP"],
  Concert: ["Regular", "VIP", "VVIP"],
  Exhibition: ["Regular", "VIP"],
};

export default function BookTicketPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [ticketType, setTicketType] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  // Fetch user from Supabase Auth
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
        setUserEmail(data.user.email ?? '');
      } else {
        setUserId('');
        setUserEmail('');
      }
    };
    getUser();
  }, []);

  // Fetch all events
  useEffect(() => {
    fetch('/api/getevent')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(() => setEvents([]));
  }, []);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    if (!userId) {
      setError('Anda harus login untuk memesan tiket.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/bookticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          eventId: selectedEvent?.id,
          types: ticketType,
          quantity,
          status: "active",
          purchaseDate: new Date(),
          totalPrice: 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserId('');
    setUserEmail('');
    window.location.href = '/login'; // atau reload
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Event</h1>
      {userId ? (
        <div className="mb-4 text-green-700">Login sebagai: <b>{userEmail || userId}</b></div>
      ) : (
        <div className="mb-4 text-red-700">Anda belum login. Silakan login untuk memesan tiket.</div>
      )}
      <ul className="mb-8">
        {events.length === 0 && <li>Tidak ada event tersedia.</li>}
        {events.map(event => (
          <li
            key={event.id}
            className={`p-3 border rounded mb-2 cursor-pointer ${selectedEvent?.id === event.id ? 'bg-blue-100' : ''}`}
            onClick={() => {
              setSelectedEvent(event);
              setTicketType('');
              setQuantity(1);
              setResult(null);
              setError(null);
            }}
          >
            <div className="font-semibold">{event.name}</div>
            <div className="text-sm text-gray-600">{event.location} | {event.date} {event.time}</div>
            <div className="text-sm">Tipe: {event.types}</div>
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <form onSubmit={handleBook} className="border rounded p-4 bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Pesan Tiket untuk: {selectedEvent.name}</h2>
          <div className="mb-2">
            <label className="block mb-1">Kategori Tiket</label>
            <select
              value={ticketType}
              onChange={e => setTicketType(e.target.value)}
              className="w-full border p-2"
              required
            >
              <option value="" disabled>Pilih kategori</option>
              {ticketTypeMap[selectedEvent.types]?.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Jumlah Tiket</label>
            <input
              type="number"
              min={1}
              max={5}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="w-full border p-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !userId}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'Memesan...' : 'Pesan Tiket'}
          </button>
        </form>
      )}

      {result && (
        <div className="mt-4 p-4 border border-green-500 text-green-700 bg-green-50 rounded">
          <h2 className="font-semibold">✅ Tiket berhasil dipesan!</h2>
          <pre className="text-sm">{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border border-red-500 text-red-700 bg-red-50 rounded">
          <h2 className="font-semibold">❌ Gagal:</h2>
          <p>{error}</p>
        </div>
      )}
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}
