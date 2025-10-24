import React, { useState } from "react";
import { getUsers, saveUsers } from "../utils/localStorage";

export default function ProfileEditor({ user, onClose }) {
  const [activeTab, setActiveTab] = useState("basic");
  const [form, setForm] = useState(user);

  const saveProfile = () => {
    const updated = getUsers().map((u) => (u.id === user.id ? form : u));
    saveUsers(updated);
    alert("Profile saved successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <h3 className="text-xl font-bold mb-3">Edit User Profile</h3>
        <div className="flex gap-4 border-b pb-2 mb-4">
          {["basic", "education", "experience"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded ${
                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {tab === "basic"
                ? "Basic Info"
                : tab === "education"
                ? "Education & Skills"
                : "Experience"}
            </button>
          ))}
        </div>

        {activeTab === "basic" && (
          <div className="space-y-3">
            <input
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Name"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              className="border w-full p-2 rounded"
              placeholder="Email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Contact"
              value={form.contact || ""}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-3">
            <textarea
              className="border w-full p-2 rounded"
              placeholder="Education & Skills"
              value={form.education || ""}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
            />
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-3">
            <input
              type="text"
              className="border w-full p-2 rounded"
              placeholder="LinkedIn URL"
              value={form.linkedin || ""}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            />
            <input
              type="file"
              className="border w-full p-2 rounded"
              onChange={(e) => setForm({ ...form, resume: e.target.files[0]?.name })}
            />
          </div>
        )}

        <div className="flex justify-end mt-5 gap-2">
          <button className="px-3 py-2 border rounded" onClick={onClose}>
            Close
          </button>
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded"
            onClick={saveProfile}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
