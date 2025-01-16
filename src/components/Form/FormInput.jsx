import React from "react";

export default function FormInput({ label, name, type, defaultValue }) {
  return (
    <label className="form-control">
      <label className="label ">
        <span className="capitalize label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered"
      />
    </label>
  );
}
