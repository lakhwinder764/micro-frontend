// src/booking/BookingForm.tsx
import React, { useState } from "react";
import { useSessionStore } from "../shared/store";

export default function BookingForm() {
  const [room, setRoom] = useState("Room A");
  const [time, setTime] = useState("10:00");

  const addBooking = useSessionStore((s) => s.addBooking);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!room.trim() || !time.trim()) return;
    addBooking({ room, time });
    setRoom("Room A");
    setTime("10:00");
  };

  return (
    <form onSubmit={submit} style={{ padding: 16 }}>
      <h2>New Booking</h2>

      <label>
        Room:&nbsp;
        <input value={room} onChange={(e) => setRoom(e.target.value)} />
      </label>
      <br />

      <label>
        Time:&nbsp;
        <input value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <br />

      <button type="submit">Book</button>
    </form>
  );
}
