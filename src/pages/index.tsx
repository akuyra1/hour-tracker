// # Home page (redirects or shows auth)

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Auth from '../components/Auth';
// import { useAuth } from '../context/authContext'; // Uncomment and use your auth context

export default function Home() {
  // const { isAuthenticated } = useAuth(); // Replace with your authentication logic
  const isAuthenticated = false; // Placeholder; replace with actual auth check
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <div>Redirecting to dashboard...</div>;
  }

  return <Auth />;
}