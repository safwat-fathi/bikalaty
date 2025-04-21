"use client";

import Link from "next/link";

import BurgerMenuIcon from "@/lib/icons/BurgerMenuIcon";
import HeartIcon from "@/lib/icons/HeartIcon";
import ShoppingCartIcon from "@/lib/icons/ShoppingCartIcon";
import { useCart } from "@/lib/providers/cart.provider";
import { useWishlist } from "@/lib/providers/wishlist.provider";

import Button from "../Button";
import CartPreview from "../CartPreview";
import WishlistPreview from "../WishlistPreview";
import SearchInput from "./SearchInput";
const Drawer = dynamic(() => import("../Drawer"), { ssr: false });
import dynamic from "next/dynamic";
import { useState } from "react";

import HomeIcon from "@/lib/icons/HomeIcon";

// grocery store categories
const categories = [
  {
    name: "grocery",
  },
  {
    name: "frozen",
  },
  {
    name: "meat",
  },
  {
    name: "dairy",
  },
  {
    name: "bakery",
  },
  {
    name: "produce",
  },
  {
    name: "beverages",
  },
  {
    name: "snacks",
  },
  {
    name: "pets",
  },
];

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-base-100 sticky top-0 z-50 flex flex-col justify-center gap-4 px-0 py-4">
        <div className="container mx-auto flex w-full items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Button className="btn-sm md:hidden" onClick={toggleMenu}>
              <BurgerMenuIcon />
            </Button>
            <Link href="/" className="text-xl font-bold">
              Bikalaty
            </Link>
          </div>

          <div className="hidden w-[30rem] md:block">
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
                  <CartPreview />
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
                  <WishlistPreview />
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                  <span>SF</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
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
        </div>
        <div className="hidden h-[1px] w-full bg-gray-200 md:flex" />
        <div className="container mx-auto hidden w-full gap-4 py-1 md:flex">
          <Link href="/" className="link link-hover hover:text-primary flex items-center gap-1">
            <HomeIcon />
            Home
          </Link>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name}`}
              className="link link-hover hover:text-primary capitalize"
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="h-[1px] w-full bg-gray-200" />
        <div className="container mx-auto md:hidden">
          <SearchInput />
        </div>
      </nav>
      <Drawer title="Menu" isOpen={isOpen} onClose={toggleMenu} isStatic={false}>
        <div className="flex h-screen flex-col gap-4 px-4">
          <Link href="/" className="link link-hover hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="link link-hover hover:text-primary">
            Products
          </Link>
          <Link href="/about" className="link link-hover hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="link link-hover hover:text-primary">
            Contact
          </Link>
          <Link href="/blog" className="link link-hover hover:text-primary">
            Blog
          </Link>
          <Link href="/cart" className="link link-hover hover:text-primary">
            Cart
          </Link>
          <Link href="/wishlist" className="link link-hover hover:text-primary">
            Wishlist
          </Link>
          <Link href="/login" className="link link-hover hover:text-primary">
            Login
          </Link>
          <Link href="/register" className="link link-hover hover:text-primary">
            Register
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
