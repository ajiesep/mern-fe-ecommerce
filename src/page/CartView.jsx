import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartList from "../components/CartList";
import CartTotal from "../components/CartTotal";

export default function CartView() {
  const user = useSelector((state) => state.userState.user);
  const numItemInCart = useSelector((state) => state.cartState.numItemsInCart);
  if (numItemInCart === 0) {
    return (
      <>
        <h1 className="text-3xl font-bold text-center">
          Belum ada product di keranjang
        </h1>
      </>
    );
  }

  return (
    <>
      <div className="pb-5 mt-5 border-b border-primary">
        <h2 className="text-2xl font-bold capitalize">list keranjang</h2>
      </div>
      <div className="grid gap-8 mt-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
          {user ? (
            <Link to="/checkout" className="mt-8 btn btn-primary btn-block">
              Checkout
            </Link>
          ) : (
            <Link to="/login" className="mt-8 btn btn-primary btn-block">
              Please login to checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
