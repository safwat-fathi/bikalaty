"use client";

import HeartIcon from "@/lib/icons/HeartIcon";
import ShoppingCartIcon from "@/lib/icons/ShoppingCartIcon";
import { useCart } from "@/lib/providers/cart.provider";
import { useWishlist } from "@/lib/providers/wishlist.provider";

import CartPreview from "../CartPreview";
import WishlistPreview from "../WishlistPreview";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="navbar bg-base-100 flex items-center justify-between shadow-sm">
      <div>
        <a className="btn btn-ghost text-xl">Bikalaty</a>
      </div>

      <div className="w-[20rem]">
        <SearchInput />
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="badge badge-sm indicator-item">{cart.length}</span>
            </div>
          </div>
          <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-[25rem] shadow">
            <div className="card-body">
              <CartPreview cartItems={cart} />
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <HeartIcon className="h-6 w-6" />
              <span className="badge badge-sm indicator-item">{wishlist.length}</span>
            </div>
          </div>
          <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-[25rem] shadow">
            <div className="card-body">
              <WishlistPreview wishlistItems={wishlist} />
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-12 rounded-full">
              <span>SF</span>
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
