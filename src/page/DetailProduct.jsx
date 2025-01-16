import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import customAPI from "../api";
import { FaPlus } from "react-icons/fa";
import { generateSelectAmount, priceFormat } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

export default function DetailProduct() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [amount, setAmount] = useState(1);

  // store
  const dispatch = useDispatch();

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
    stock: product.stock,
    amount,
  };

  const handleCart = () => {
    dispatch(addItem({ product: productCart }));
  };

  const productData = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };
  useEffect(() => {
    productData();
  }, []);

  return (
    <section>
      <div className="shadow-xl card lg:card-side bg-base-300">
        <figure>
          <div className="relative ">
            <img
              src={product.image}
              alt={product.name}
              className="w-[400px] h-[500px] object-cover"
            />
            {product.stock < 1 && (
              <span className="absolute top-0 right-0 text-4xl font-bold bg-error">
                Sold Out
              </span>
            )}
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <span className="mt-2 text-3xl font-bold text-accent">
            {priceFormat(product.price)}
          </span>
          <span className="badge badge-primary">{product.category}</span>
          <span className="mt-3 font-bold">Stock : {product.stock}</span>
          <p className="mt-3">{product.description}</p>
          <div className="justify-end card-actions">
            <div className="flex flex-col p-8 gap-y-4">
              {product.stock > 0 && (
                <>
                  <label className="form-control">
                    <label className="label">
                      <span className="capitalize label-text">Amount</span>
                    </label>
                    <select
                      name="amount"
                      className="select select-bordered"
                      onChange={handleAmount}
                    >
                      {generateSelectAmount(product.stock)}
                    </select>
                  </label>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleCart}
                  >
                    <FaPlus /> Keranjang
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
