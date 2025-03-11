"use client"

import { useState, useEffect } from "react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string[];
}
interface EmployeeListProps {
    initialUsers: User[]; 
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

  
  const EmployeeList: React.FC<EmployeeListProps> = ({ initialUsers, setUsers }) => {
  const [users, setLocalUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState({ firstName: "", lastName: "", phone: "" });
  const [isClient, setIsClient] = useState(false); // Prevent SSR mismatch

  // Ensure data only initializes on the client-side
  useEffect(() => {
    setLocalUsers(initialUsers);
    setUsers(initialUsers);
    setIsClient(true);
  }, [initialUsers]);

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/employee/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error deleting user: ${errorMessage}`);
      }
  
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  

  const updateUser = async () => {
    if (!editingUser) return;
  
    try {
      const updatedData = {
        id: editingUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: editingUser.email, 
        role: editingUser.role,
      };
  
      const response = await fetch(`/api/employee/${editingUser._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Error updating user");
      }
  
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editingUser._id ? { ...user, ...updatedData } : user))
      );
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };
  

  if (!isClient) return <div>Loading...</div>; 

  return (
    <div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border">
              <td className="border p-2">{user.firstName}</td>
              <td className="border p-2">{user.lastName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button onClick={() => deleteUser(user._id)} className="text-red-500 mr-2">
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditingUser(user);
                    setUpdatedUser({ firstName: user.firstName, lastName: user.lastName, phone: user.phone });
                  }}
                  className="text-blue-500"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Edit User</h2>
            <input
              type="text"
              placeholder="First Name"
              value={updatedUser.firstName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={updatedUser.lastName}
              onChange={(e) => setUpdatedUser({ ...updatedUser, lastName: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={updatedUser.phone}
              onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <button onClick={updateUser} className="bg-blue-500 text-white p-2 rounded mr-2">
              Update
            </button>
            <button onClick={() => setEditingUser(null)} className="bg-gray-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
