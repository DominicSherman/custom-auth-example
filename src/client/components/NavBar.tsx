import { getUserId, logout } from 'client/services/auth-service';
import Link from 'next/link';
import React from 'react';

export const NavBar = () => {
  const userId = getUserId();

  return (
    <div className="top-0 sticky w-full flex flex-row justify-center">
      <div className="container flex w-maxflex-row justify-between content-center w-full px-16 py-4">
        <h2 className="text-xl font-semibold">Custom Auth Example 🚀</h2>
        <div>
          {userId ? (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
