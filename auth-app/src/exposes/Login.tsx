import React from 'react';
import { useSessionStore } from '../shared/store';

export default function Login() {
  const login = useSessionStore((s) => s.login);
  const user = useSessionStore((s) => s.user);

  if (user) return <div>Already logged in as {user.name}</div>;

  const doLogin = () =>
    login({ id: '1', name: 'Ada', role: 'admin' });

  return (
    <div style={{ padding: 16 }}>
      <h2>Login</h2>
      <button onClick={doLogin}>Login as Admin</button>
    </div>
  );
}
