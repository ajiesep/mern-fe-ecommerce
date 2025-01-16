import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Hero() {
  const { products } = useLoaderData();
  return (
    <>
      <div className="grid items-center gap-24 lg:grid-cols-2">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            Selamat Datang di My Shop
          </h1>
          <p className="mt-8 text-lg leading-8 mx-w-xl">
            Dimana kalian bisa mencari baju, sepatu, kemeja dll dari kita btw
            ini bukan official ini cuman untuk testing development aja
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              Produk kami
            </Link>
          </div>
        </div>
        <div className="hidden p-4 space-x-4 lg:carousel carousel-center bg-neutral rounded-box">
          {products.map((item) => (
            <div className="carousel-item" key={item._id}>
              <img src={item.image} className="rounded-box" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
