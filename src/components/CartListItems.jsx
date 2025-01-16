import React from "react";
import { generateSelectAmount, priceFormat } from "../utils";
import { FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../features/cartSlice";

export default function CartListItems({ cartItem }) {
  const { cartId, name, price, image, amount, stock } = cartItem;
  const dispatch = useDispatch();
  const handleAmount = (e) => {
    dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };
  const removeProductItem = () => {
    dispatch(removeItem({ cartId }));
  };
  return (
    <article
      className="flex flex-col flex-wrap pb-6 mb-12 border-b gap-y-4 sm:flex-row border-base-300 last:border-b-0"
      key={cartId}
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-lg sm:2-x3 sm:h-32 pbject-cover"
      />
      <div className="sm:ml-16 sm:w-48">
        <h2 className="name">{name}</h2>
        <span className="font-bold">jumlah {amount}</span>
      </div>
      <p className="font-bold sm:ml-auto">{priceFormat(price)}</p>
      <div className="sm:ml-12">
        <div className="max-w-xs form-control">
          <select
            name="amount"
            className="select select-bordered sm:w-full"
            value={amount}
            onChange={handleAmount}
          >
            {generateSelectAmount(stock)}
          </select>
        </div>
        <button
          className="mt-2 btn-secondary btn-block btn"
          onClick={removeProductItem}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
}
