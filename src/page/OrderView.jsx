import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { priceFormat } from "../utils";
import customAPI from "../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }
  let orders;
  if (user.role !== "owner") {
    const { data } = await customAPI.get("/order/current/user");

    orders = data.data;
  } else {
    const { data } = await customAPI.get("/order");

    orders = data.data;
  }
  console.log(orders);
  return { orders };
};

export default function OrderView() {
  const { orders } = useLoaderData();
  if (!orders.length) {
    return (
      <h1 className="py-3 text-3xl font-bold text-center border-b text-primary border-secondary">
        Orderan anda masih kosong
      </h1>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <td>No .</td>
            <td>Order By</td>
            <td>Product</td>
            <td>Total</td>
            <td>Status Pembayaran</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={item._id} className="hover">
              <th>{index + 1}</th>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>
                <ul className="list-disc">
                  {item.itemsDetail.map((itemProduct) => (
                    <li key={itemProduct.product}>
                      {itemProduct.name} <br />
                      <span className="font-bold">
                        Jumlah {itemProduct.quantity} Product
                      </span>{" "}
                      <br />
                      {priceFormat(itemProduct.price)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{priceFormat(item.total)}</td>
              <td>
                {item.status === "pending" ? (
                  <span className="btn btn-info">Pending</span>
                ) : item.status === "success" ? (
                  <span className="btn btn-success">Success </span>
                ) : (
                  <span className="btn btn-error">Filed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
