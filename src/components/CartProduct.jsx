import React from "react";
import { Link } from "react-router-dom";
import { priceFormat } from "../utils";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import CustomAPI from "../api";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router-dom";
import customAPI from "../api";

export default function CartProduct({ item, user }) {
  const { revalidate } = useRevalidator();
  return (
    <div className="shadow-xl card bg-base-300 " key={item._id}>
      <figure>
        <div className="relative">
          <img src={item.image} alt="Shoes" />
          {item.stock < 1 && (
            <span className="absolute top-0 right-0 text-2xl font-bold bg-error">
              Sold Out
            </span>
          )}
        </div>
      </figure>
      <div className="card-body">
        {user && user.role === "owner" && (
          <div className="flex justify-end gap-x-3">
            <FaTrash
              onClick={async () => {
                await customAPI.delete(`/product/${item._id}`);
                toast.info("Product berhasil dihapus");
                revalidate();
              }}
              className="text-red-500 cursor-pointer"
            />
            <Link to={`/product/${item._id}/edit`}>
              <FaPencilAlt className="cursor-pointer text-info" />
            </Link>
          </div>
        )}
        <h2 className="card-title text-primary">{item.name}</h2>
        <p className="font-bold text-accent">{priceFormat(item.price)}</p>
        <p>{item.description.substring(0, 50)}</p>
        <div className="justify-end card-actions">
          <Link to={`/product/${item._id}`} className="btn btn-primary">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
