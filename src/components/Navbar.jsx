import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = 3;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Marketplace", path: "/listings" },
    { name: "Post", path: "/create" },
    { name: "My Account", path: "/account" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="bg-white/80 backdrop-blur fixed top-0 left-0 w-full shadow-md z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <Link to="/" className="text-2xl font-bold text-blue-600">
                UniBazzar
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-blue-500"
                >
                  {link.name}
                </Link>
              ))}

              <Link to="/cart" className="relative text-gray-700 hover:text-blue-500">
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/login" className="text-gray-700 hover:text-blue-500">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <span className="text-xl font-bold text-blue-600">UniBazzar</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-blue-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/cart"
                className="text-gray-700 hover:text-blue-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>

              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
