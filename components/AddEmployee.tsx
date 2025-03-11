"use client"

import { useState } from "react";

const AddEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "", phone: "", role: "Staff", password: "" });

  const addUser = async () => {
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      console.log("hello",response.json())

      if (!response.ok) throw new Error("Error adding user");

      setShowModal(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="bg-green-500 text-white p-2 rounded">Add Employee</button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Add Employee</h2>
            <input type="text" placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} className="border p-2 w-full mb-2"/>
            <input type="text" placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} className="border p-2 w-full mb-2"/>
            <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} className="border p-2 w-full mb-2"/>
            <input type="text" placeholder="Phone" onChange={(e) => setUser({ ...user, phone: e.target.value })} className="border p-2 w-full mb-2"/>
            <select onChange={(e) => setUser({ ...user, role: e.target.value })} className="border p-2 w-full mb-2">
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
            <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="border p-2 w-full mb-2"/>
            <button onClick={addUser} className="bg-green-500 text-white p-2 rounded mr-2">Add</button>
            <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
