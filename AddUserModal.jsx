import React, { useState } from "react";
import { getUsers, saveUsers } from "../utils/localStorage";

export default function AddUserModal({ onClose, onAdded }) {
  const [form, setForm] = useState({ name: "", email: "", contact: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const newUser = { id: Date.now(), ...form };
    saveUsers([...users, newUser]);
    onAdded();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-semibold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="border w-full p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Contact"
            className="border w-full p-2 rounded"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-3 py-2 border rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
