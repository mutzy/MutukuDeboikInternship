"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface User {
  firstName: string;
  lastName: string;
  phone: string;
}

interface UpdateUserModalProps {
  user: User;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [form, setForm] = useState<User>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  });

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated User Data:", form);
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
      >
        Edit User
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <Dialog.Title className="text-lg font-semibold">Update User</Dialog.Title>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-3 py-2 border rounded"
                  required
                />

                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border rounded"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded"
                  required
                />

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateUserModal;
