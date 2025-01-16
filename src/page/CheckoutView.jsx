import React from "react";
import CartTotal from "../components/CartTotal";
import FormInput from "../components/Form/FormInput";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import customApi from "../api";
import { toast } from "react-toastify";
import { clearCartItem } from "../features/cartSlice";
import { redirect, useNavigate } from "react-router-dom";

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_CLIENT_MIDTRANS
    );
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

export const loader = (storage) => () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }
  return null;
};

export default function CheckoutView() {
  const user = useSelector((state) => state.userState.user);
  const carts = useSelector((state) => state.cartState.CartItems);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);

    const data = Object.fromEntries(formdata);

    const newArrayKeranjang = carts.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,
      };
    });

    try {
      const response = await customApi.post("/order", {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        cartItem: newArrayKeranjang,
      });

      const snapToken = response.data.token;

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);
          dispatch(clearCartItem());
          navigate("/orders");
        },
        // Optional
        onPending: function (result) {
          console.log(result);
          alert("Pending");
        },
        // Optional
        onError: function (result) {
          console.log(result);
          alert("Error");
        },
      });
      toast.success("Berhasil Order");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="pb-5 mt-5 border-b border-primary">
        <h2 className="text-2xl font-bold capitalize">Checkout product</h2>
      </div>
      <div className="grid mt-8 gap-y-8 gap-x-2 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-8 ">
          <form
            method="POST"
            className="grid items-center p-5 rounded-2xl bg-base-300 grid-y-5"
            onSubmit={handleCheckout}
          >
            <div className="grid grid-cols-2 gap-x-4">
              <FormInput label="first name" type="name" name="firstname" />
              <FormInput label="last name" type="name" name="lastname" />
            </div>
            <FormInput
              label="email"
              type="email"
              name="email"
              defaultValue={user.email}
            />
            <FormInput label="phone" type="name" name="phone" />
            <button type="submit" className="mt-8 btn btn-primary">
              Bayar
            </button>
          </form>
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotal />
        </div>
      </div>
    </>
  );
}
