import React from 'react';
import { useSessionStore } from '../shared/store';
// import { useSessionStore } from 'auth_app/Stores';

export default function ReportDashboard() {
  const user = useSessionStore((s) => s.user);
  console.info(user,'user')
  if (!user) return <div>Please log in to view reports.</div>;
  if (user.role !== 'admin') return <div>Access denied (admin only).</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Reports</h2>
      <div>📈 Minimal demo chart placeholder</div>
    </div>
  );
}
