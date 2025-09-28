// src/booking/BookingList.tsx
import React from "react";
import { useSessionStore } from "../shared/store";

export default function BookingList() {
  const bookings = useSessionStore((s) => s.bookings);
  const removeBooking = useSessionStore((s) => s.removeBooking);
  const clearBookings = useSessionStore((s) => s.clearBookings);

  if (bookings.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Bookings</h2>
        <p>No bookings yet. Create one above.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b.id} style={{ marginBottom: 8 }}>
            <strong>{b.room}</strong> — {b.time}{" "}
            <button onClick={() => removeBooking(b.id)} style={{ marginLeft: 8 }}>
              cancel
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearBookings}>Clear all</button>
    </div>
  );
}
