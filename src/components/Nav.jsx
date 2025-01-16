import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavList from "./NavList";
import { BsCart3 } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import customAPI from "../api";
import { logoutUser } from "../features/userSlice";
import { clearCartItem } from "../features/cartSlice";

export default function Nav() {
  const user = useSelector((state) => state.userState.user);
  const countInCart = useSelector((state) => state.cartState.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlingLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    }
  };

  return (
    <nav className="bg-base-200">
      <div className="max-w-6xl px-8 mx-auto navbar">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="items-center hidden text-3xl lg:flex btn btn-primary"
          >
            Logo
          </NavLink>
          {/* Mobile devide */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className="mt-3 menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavList />
            </ul>
          </div>
          {/* PC device */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal">
              <NavList />
            </ul>
          </div>
        </div>
        <div className="gap-5 navbar-end">
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md">
            <div className="indicator">
              <BsCart3 />
              <span className="badge badge-primary badge-sm indicator-item">
                {countInCart}
              </span>
            </div>
          </NavLink>
          {user && (
            <button
              className="btn btn-error btn-outline btn-md"
              onClick={handlingLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
