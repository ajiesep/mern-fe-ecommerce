import React from "react";
import FormAuth from "../../components/FormAuth";
import customAPI from "../../api";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../features/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    console.log(store);
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("/auth/register", data);
      store.dispatch(registerUser(response.data));
      toast.success("Register success");
      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

export default function RegisterView() {
  return (
    <main>
      <FormAuth isRegister={true} />
    </main>
  );
}
