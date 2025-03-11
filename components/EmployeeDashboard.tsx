"use client";

import { useEffect, useState } from "react";
import EmployeeList from "@/components/EmployeeList";
import { signOut, useSession } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AddEmployee from "./AddEmployee";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

const EmployeeDashboard = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/employees");
        if (!response.ok) throw new Error("Failed to fetch employees");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (!isClient) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
        <h1 className="text-xl font-bold text-gray-700">Employees</h1>
        <Menu>
          <MenuButton className="flex items-center space-x-2 bg-gray-200 p-2 rounded-md">
            <span>Hi, {session?.user?.name ?? ""}</span>
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
              <MenuItem>
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700"
                >
                  Logout
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </header>

      <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Mutuku's Bakery Ventures</h2>
          <AddEmployee />
        </div>

        {loading ? (
          <div className="text-center py-4">Loading employees...</div>
        ) : (
          <EmployeeList initialUsers={users} setUsers={setUsers} />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
