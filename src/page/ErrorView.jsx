import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorView() {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="font-bold text-9xl text-primary">404</h1>
          <p className="mt-6 text-lg leading-7">Maaf halaman tidak ditemukan</p>
          <div className="mt-10">
            <Link to="/" className="btn btn-primary">
              Kembali ke home
            </Link>
          </div>
        </div>
      </main>
    );
  } else if (error.status === 500) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8">
        <div className="text-center">
          <h1 className="font-bold text-9xl text-primary">504</h1>
          <p className="mt-6 text-lg leading-7">Maaf server bermasalah</p>
          <div className="mt-10">
            <Link to="/" className="btn btn-primary">
              Kembali ke home
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
