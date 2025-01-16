import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.userState.user);
  return (
    <header className="py-2 bg-neutral text-neutral-content">
      <div className="flex justify-center max-w-6xl px-8 mx-auto sm:justify-end">
        {user ? (
          <div className="flex items-center gep-x-2 sm:gap-x-8 ">
            <p className="text-xs sm:text-sm">Hello, {user.name}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-x-6">
            <Link to="/login" className="text-xs link link-hover sm:text-sm">
              Sign In
            </Link>
            <Link to="/register" className="text-xs link link-hover sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
