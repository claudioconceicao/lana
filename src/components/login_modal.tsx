import Modal from "./ui/modal";
import { useState, useEffect } from "react";

const LoginModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    }
    useEffect(
        () => {
            return () => {

            };
      }
    )
    return (
    <Modal onClose={() => handleClose()} isOpen={isOpen}>
      <div className="login-modal mt-12 h-[400]">
        <h2 className="text-2xl font-bold">Login</h2>
        <form className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block p-3 w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <div className="mb-4 hidden">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block p-3 w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
  
      </div>
    </Modal>
  );
};
export default LoginModal;
