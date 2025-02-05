
"use client"
import { useRouter } from 'next/navigation';
import supabase from '../config/supabase';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
    } else {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="flex justify-between">
        <h1 className="text-xl font-bold">Rating App</h1>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">Home</Link>
          <Link href="/add-rating" className="hover:underline">Add Rating</Link>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;