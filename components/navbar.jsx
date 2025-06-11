'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold hover:text-teal-400">
        Todo App
      </Link>

      <div className="flex gap-4 items-center">
        {status === "loading" ? null : session ? (
          <>
            <span className="text-sm">Welcome, {session.user.email}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-teal-400 text-sm">
              Login
            </Link>
            <Link href="/register" className="hover:text-teal-400 text-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
