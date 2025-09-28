// host/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import { useSessionStore } from './shared/store';

const Login = React.lazy(() => import('auth_app/Login'));
const UserProfile = React.lazy(() => import('auth_app/UserProfile'));
const BookingList = React.lazy(() => import('booking_app/BookingList'));
const BookingForm = React.lazy(() => import('booking_app/BookingForm'));
const ReportDashboard = React.lazy(() => import('reporting_app/ReportDashboard'));

function Nav() {
  const user = useSessionStore((s) => s.user);
  return (
    <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ccc'}}>
      <Link to="/">Home</Link>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/profile">Profile</Link>
      <Link to="/booking/list">Bookings</Link>
      <Link to="/booking/new">New Booking</Link>
      <Link to="/reports">Reports</Link>
      <span style={{marginLeft:'auto'}}>{user ? `👤 ${user.name} (${user.role})` : 'Not logged in'}</span>
    </nav>
  );
}

const wrap = (node: React.ReactNode, msg: string) => (
  <ErrorBoundary fallback={<div style={{ padding:16, color:'crimson' }}>{msg}</div>}>
    <React.Suspense fallback={<div style={{ padding:16 }}>Loading…</div>}>{node}</React.Suspense>
  </ErrorBoundary>
);

const router = createBrowserRouter([
  { path: '/', element: <><Nav /><div style={{padding:16}}>Host shell</div></> },
  { path: '/auth/login',   element: <><Nav/>{wrap(<Login/>,        'Auth module is currently unavailable.')}</> },
  { path: '/auth/profile', element: <><Nav/>{wrap(<UserProfile/>,  'Auth module is currently unavailable.')}</> },
  { path: '/booking/list', element: <><Nav/>{wrap(<BookingList/>,  'Booking module is currently unavailable.')}</> },
  { path: '/booking/new',  element: <><Nav/>{wrap(<BookingForm/>,  'Booking module is currently unavailable.')}</> },
  { path: '/reports',      element: <><Nav/>{wrap(<ReportDashboard/>, 'Reporting module is currently unavailable.')}</> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);
