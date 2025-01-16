import React from "react";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextArea from "../components/Form/FormTextArea";
import customAPI from "../api";
import { toast } from "react-toastify";
import { useNavigate, redirect } from "react-router-dom";

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

export default function CreateProductView() {
  const categories = ["sepatu", "baju", "kemeja", "celana"];
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const dataForm = new FormData(form);

    const data = Object.fromEntries(dataForm);

    try {
      //upload file
      const responseFileUpload = await customAPI.post(
        "/product/file-upload",
        {
          image: data.image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Reponse image", responseFileUpload.data.url);

      // create product
      await customAPI.post("/product", {
        name: data.name,
        price: data.price,
        description: data.description,
        stock: data.stock,
        category: data.category,
        image: responseFileUpload.data.url,
      });

      toast.success("Product berhasil ditambahkan");
      navigate("/products");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label className="form-control">
        <label className="label ">
          <span className="capitalize label-text">Image</span>
        </label>
        <input
          type="file"
          name="image"
          className="w-full max-w-xs file-input file-input-bordered file-input-primary"
        />
      </label>
      <FormSelect name="category" label="Pilih Category" list={categories} />
      <FormInput name="name" label="Nama Product" type="text" />
      <FormInput name="price" label="Harga Product" type="number" />
      <FormInput name="stock" label="Stock Product" type="number" />
      <FormTextArea name="description" label="Description Product" />
      <input
        type="submit"
        value="Tambah"
        className="mt-5 btn btn-primary btn-block btn-md"
      />
    </form>
  );
}
