import React from 'react';
import { useSessionStore } from '../shared/Store';

export default function UserProfile() {
  const user = useSessionStore((s) => s.user);
  const logout = useSessionStore((s) => s.logout);

  if (!user) return <div>Please log in.</div>;
  return (
    <div style={{ padding: 16 }}>
      <h3>User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
