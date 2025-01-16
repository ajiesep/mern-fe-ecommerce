import React from "react";
import customAPI from "../api";
import { Link, useLoaderData } from "react-router-dom";
import Filter from "../components/Filter";
import CartProduct from "../components/CartProduct";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const { data } = await customAPI.get("/product", { params: params });

  // console.log(params);
  const products = data.data;
  // console.log(products);
  const pagination = data.pagination;

  return { products, params, pagination };
};

export default function ProductView() {
  const user = useSelector((state) => state.userState.user);
  const { products, pagination } = useLoaderData();
  // console.log(products);
  return (
    <>
      <Filter />
      {user && user.role === "owner" && (
        <div className="flex justify-end">
          <Link to="/product/create" className="btn btn-secondary">
            Tambah Product
          </Link>
        </div>
      )}

      <h3 className="my-3 text-lg font-bold text-right text-primary">
        Total : {pagination.totalProduct} Product
      </h3>
      <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-3 lg:grid-cols-4">
        {!products.length ? (
          <h1 className="mt-5 text-3xl font-bold">
            Tidak ada product yang dicari
          </h1>
        ) : (
          products.map((item) => (
            <CartProduct item={item} key={item._id} user={user} />
          ))
        )}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination />
      </div>
    </>
  );
}
