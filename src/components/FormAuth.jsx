import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Form/FormInput";

export default function FormAuth({ isRegister }) {
  return (
    <div className="grid h-screen place-items-center">
      <Form
        method="POST"
        className="flex-col p-8 shadow-lg card w-96 bg-base-300 felx gap-y-4"
      >
        <h4 className="text-3xl font-bold text-center">
          {isRegister ? "Register" : "Login"}
        </h4>
        {isRegister ? (
          <FormInput type="name" name="name" label="username" />
        ) : null}
        <FormInput type="email" name="email" label="email" />
        <FormInput type="password" name="password" label="password" />
        <div className="mt-4">
          <button type="submit" className="btn btn-primary btn-block">
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
        {isRegister ? (
          <p className="text-center">
            Sudah ada Akun?
            <Link
              to="/login"
              className="ml-2 capitalize link link-hover link-accent"
            >
              Login
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Belum ada Akun?
            <Link
              to="/register"
              className="ml-2 capitalize link link-hover link-accent"
            >
              Register
            </Link>
          </p>
        )}
      </Form>
    </div>
  );
}
