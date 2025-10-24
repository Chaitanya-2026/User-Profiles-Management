import React, { useState, useEffect } from "react";
import { getUsers, saveUsers, logoutUser, getAuthUser } from "../utils/localStorage";
import AddUserModal from "./AddUserModal";
import ProfileEditor from "./ProfileEditor";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const deleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);
    saveUsers(updated);
    setUsers(updated);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">User List</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add User
          </button>
          <button
            onClick={() => {
              logoutUser();
              location.reload();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2">#</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id} className="border-b">
              <td className="p-2 text-center">{i + 1}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2 flex gap-2 justify-center">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setSelectedUser(u)}
                >
                  View/Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAdded={() => {
            setShowModal(false);
            setUsers(getUsers());
          }}
        />
      )}
      {selectedUser && (
        <ProfileEditor user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
