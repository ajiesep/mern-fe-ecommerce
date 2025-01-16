import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import customAPI from "../api";
import Loading from "../components/Loading";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";
import { toast } from "react-toastify";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }
  if (user.role != "owner") {
    toast.warn("Anda tidak memiliki akses ke halaman ini");
    return redirect("/");
  }
  return null;
};

export default function EditProductView() {
  const [product, setProduct] = useState(null);
  const categories = ["sepatu", "baju", "kemeja", "celana"];
  const { id } = useParams();
  const navigate = useNavigate();
  const getProductId = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
    console.log(data.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);

    try {
      // create product
      await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
      });

      toast.info("Product berhasil diupdate");
      navigate("/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    getProductId();
  }, []);

  return (
    <>
      {product ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormSelect
            name="category"
            label="Pilih Category"
            list={categories}
            defaultValue={product.category}
          />
          <FormInput
            name="name"
            label="Nama Product"
            type="text"
            defaultValue={product.name}
          />
          <FormInput
            name="price"
            label="Harga Product"
            type="number"
            defaultValue={product.price}
          />
          <FormInput
            name="stock"
            label="Stock Product"
            type="number"
            defaultValue={product.stock}
          />
          <FormTextArea
            name="description"
            label="Description Product"
            defaultValue={product.description}
          />
          <input
            type="submit"
            value="Edit"
            className="mt-5 btn btn-primary btn-block btn-md"
          />
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
}
