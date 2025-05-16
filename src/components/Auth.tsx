// # Authentication component (login/signup)
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.user?.identities?.length === 0) {
          throw new Error('Email already registered');
        }
        setMessage('Signup successful! Please check your email to confirm your account.');
        setIsSignup(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.includes('not confirmed')) {
            throw new Error('Please confirm your email before logging in.');
          }
          throw new Error('Invalid login credentials');
        }
        if (data.user) {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col w-64">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-2 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-2"
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => {
          setIsSignup(!isSignup);
          setError(null);
          setMessage(null);
        }}
        className="text-blue-500 hover:underline"
      >
        {isSignup ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
};

export default Auth;