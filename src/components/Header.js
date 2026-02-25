"use client";
import Link from "next/link";

export default function Header({ loggedIn, logout }) {
  return (
    <header className="sticky top-0 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="font-bold text-xl">UserHub</div>

        <div className="flex gap-3 justify-center items-center">
          {loggedIn ? (
            <button onClick={logout} className="px-4 py-1 rounded bg-black text-white">
              Logout
            </button>
          ) : (
            <>
              <Link href="/signin">Sign in</Link>
              <Link className="px-3 py-1 bg-black text-white rounded" href="/signup">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}