import React from "react";

export default function FormTextArea({ label, name, defaultValue }) {
  return (
    <label className="form-control">
      <label className="label ">
        <span className="capitalize label-text">{label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered h-36"
        name={name}
        defaultValue={defaultValue}
      ></textarea>
    </label>
  );
}
