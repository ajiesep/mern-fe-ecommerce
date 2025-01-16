import React from "react";

export default function FormSelect({ label, name, list, defaultValue }) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="select select-bordered"
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}
