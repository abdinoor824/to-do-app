'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <Link href="/">Todo app</Link>

      {status === "loading" ? null : session ? (
        <>
          <span>Welcome, {session.user.email}</span>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
