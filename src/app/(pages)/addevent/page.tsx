'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../../supabase/client';

interface TicketInput {
  types: string;
  price: string;
  quantity: string;
}

export default function EventPage() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    date: '',
    time: '',
    types: '',
    capacity: '',
    description: '',
  });

  const [tickets, setTickets] = useState<TicketInput[]>([]);
  const [result, setResult] = useState<EventResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const ticketTypeMap: Record<string, string[]> = {
    Seminar: ["Regular", "VIP"],
    Concert: ["Regular", "VIP", "VVIP"],
    Exhibition: ["Regular", "VIP"],
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'types') {
      const selectedTypes = ticketTypeMap[value] || [];
      setTickets(
        selectedTypes.map((type) => ({
          types: type,
          price: '',
          quantity: '',
        }))
      );
    }
  };

  const handleTicketChange = (
    index: number,
    field: 'price' | 'quantity',
    value: string
  ) => {
    const updated = [...tickets];
    updated[index][field] = value;
    setTickets(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const invalidTickets = tickets.filter(ticket =>
        !ticket.price || !ticket.quantity ||
        Number(ticket.price) <= 0 || Number(ticket.quantity) <= 0
      );

      if (invalidTickets.length > 0) {
        throw new Error("Semua field harga dan kapasitas tiket harus diisi dengan nilai yang valid");
      }

      const payload = {
        ...form,
        capacity: form.capacity ? Number(form.capacity) : null,
        ticket: tickets.map((t) => ({
          types: t.types,
          price: Number(t.price),
          quantity: Number(t.quantity),
        })),
      };

      const res = await fetch('/api/addevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Unknown error');
      }

      setResult(data);
    } catch (error) {
      console.error('Error creating event:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getTicketInfo = (eventType: string) => {
    const ticketInfo = {
      Seminar: "Tiket otomatis: Regular (Rp 50.000) & VIP (Rp 100.000)",
      Concert: "Tiket otomatis: Regular (Rp 150.000), VIP (Rp 300.000) & VVIP (Rp 500.000)",
      Exhibition: "Tiket otomatis: Regular (Rp 25.000) & VIP (Rp 75.000)"
    };
    return ticketInfo[eventType as keyof typeof ticketInfo] || "";
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded mb-4">Logout</button>
      <h1 className="text-2xl font-bold mb-4">Buat Event</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Nama Event"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          name="location"
          placeholder="Lokasi"
          value={form.location}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <select
          name="types"
          value={form.types}
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="" disabled>Pilih Tipe Event</option>
          <option value="Seminar">Seminar</option>
          <option value="Concert">Concert</option>
          <option value="Exhibition">Exhibition</option>
        </select>

        {form.types && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">{getTicketInfo(form.types)}</p>
          </div>
        )}

        <input
          type="number"
          name="capacity"
          placeholder="Kapasitas"
          value={form.capacity}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {tickets.length > 0 && (
          <div className="mt-4 border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-3">Atur Harga dan Kapasitas Tiket</h2>
            {tickets.map((ticket, index) => (
              <div key={ticket.types} className="mb-4 p-3 border rounded bg-white">
                <label className="block font-medium text-gray-700 mb-2">
                  {ticket.types}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Harga (Rp)</label>
                    <input
                      type="number"
                      placeholder="Masukkan harga"
                      className="w-full border p-2 rounded"
                      value={ticket.price}
                      onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Kapasitas</label>
                    <input
                      type="number"
                      placeholder="Masukkan kapasitas"
                      className="w-full border p-2 rounded"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-medium text-blue-800 mb-2">Ringkasan Tiket:</h3>
              <div className="text-sm text-blue-700">
                <p>Total Jenis Tiket: {tickets.length}</p>
                <p>Total Kapasitas: {tickets.reduce((sum, ticket) => sum + (Number(ticket.quantity) || 0), 0)}</p>
                <p>Rentang Harga: Rp {Math.min(...tickets.map(t => Number(t.price) || 0))} - Rp {Math.max(...tickets.map(t => Number(t.price) || 0))}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {loading ? 'Membuat Event...' : 'Buat Event'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border border-green-500 text-green-700 bg-green-50 rounded">
          <h2 className="font-semibold">{result.message}</h2>
          <p className="text-sm mt-2">Event ID: {result.data?.id}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border border-red-500 text-red-700 bg-red-50 rounded">
          <h2 className="font-semibold">Gagal:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
