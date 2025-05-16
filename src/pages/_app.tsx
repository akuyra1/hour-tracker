// # Custom App component (handles auth and layout)

// # Custom App component (handles auth and layout)

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';

// Types
import { User as SupabaseUser } from '@supabase/supabase-js';
type User = SupabaseUser | null;

// Authentication Component
function Auth({ setUser }: { setUser: (user: User | null) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    const { data, error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 p-3 border border-gray-300 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 p-3 border border-gray-300 rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        onClick={handleAuth}
        className="btn bg-primary text-white w-full max-w-xs hover:shadow-hover hover:scale-105"
      >
        {isSignup ? 'Sign Up' : 'Login'}
      </button>
      <button
        onClick={() => setIsSignup(!isSignup)}
        className="mt-2 text-primary hover:underline"
      >
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
}

// Dashboard Component
function Dashboard({ user }: { user: User }) {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Hour Tracker</h1>
      <p className="mb-4">Logged in as: {user.email}</p>
      <button
        onClick={logout}
        className="btn bg-red-500 text-white w-full max-w-xs hover:shadow-hover hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session && router.pathname !== '/') {
        router.push('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Hour Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {user ? <Dashboard user={user} /> : <Auth setUser={setUser} />}
    </>
  );
}