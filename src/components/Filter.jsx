import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";
import FormSelect from "./Form/FormSelect";
import { useLoaderData } from "react-router-dom";

export default function Filter() {
  const { params } = useLoaderData();
  const { name, category } = params;
  const categories = ["sepatu", "baju", "kemeja", "celana"];
  return (
    <Form
      method="get"
      className="grid items-center grid-cols-2 px-8 py-4 rounded-md bg-base-200 gap-x-4 gap-y-3"
    >
      <FormInput
        label="Search Product"
        type="search"
        name="name"
        defaultValue={name}
      />
      <FormSelect
        label="select category"
        name="category"
        list={categories}
        defaultValue={category}
      />
      <button type="submit" className="btn btn-primary">
        SEARCH
      </button>
      <Link to="/products" className="btn btn-accent">
        RESET
      </Link>
    </Form>
  );
}
