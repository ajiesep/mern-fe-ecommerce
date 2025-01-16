import React from "react";
import CartProduct from "../components/CartProduct";
import customAPI from "../api";
import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";

export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/product?limit=3");

  const products = data.data;
  return { products };
};

export default function HomeView() {
  const { products } = useLoaderData();
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="pb-5 mt-5 border-b border-primary">
        <h2 className="text-2xl font-bold capitalize">product list</h2>
      </div>
      <div className="grid gap-5 mt-5 mg:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <CartProduct item={item} key={item._id} />
        ))}
      </div>
    </>
  );
}
