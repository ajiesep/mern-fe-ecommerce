import React from "react";

export default function Footer() {
  return (
    <footer className="p-4 footer footer-center bg-base-300 text-base-content">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Ajiesep
        </p>
      </aside>
    </footer>
  );
}
