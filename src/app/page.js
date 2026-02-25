"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [grid, setGrid] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Add User modal state
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");

  // Delete confirmation state
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null, name: "" });

  useEffect(() => {
    setLoggedIn(localStorage.getItem("auth") === "true");
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.data || []);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setLoggedIn(false);
  };

  const deleteUser = async (id) => {
    if (!loggedIn) return alert("Login required");
    await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    setConfirmDelete({ show: false, id: null, name: "" });
    fetchUsers();
  };

  const addUser = async () => {
    if (!userName) return alert("Please enter a name");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, userAge, userPassword, school, email, grade }),
    });
    const data = await res.json();
    if (!data.success) return alert(data.message || "Failed to add user");

    setUserName(""); setUserAge(""); setUserPassword(""); setSchool(""); setEmail(""); setGrade("");
    setShowAddModal(false);
    fetchUsers();
  };

  return (
    <>
      <Header loggedIn={loggedIn} logout={logout} />

      <main className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold">User Management</h1>
          <p className="text-gray-500 mt-2">{loggedIn ? "You can manage users now" : "Login to manage users"}</p>
        </section>

        {/* Top controls */}
        <div className="flex justify-between mb-6">
          <h2 className="font-semibold text-xl">Users</h2>
          <div className="flex gap-3">
            {loggedIn && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Add User
              </button>
            )}
            <button onClick={() => setGrid(!grid)} className="border px-3 py-1 rounded">
              {grid ? "List" : "Grid"}
            </button>
          </div>
        </div>

        {/* Users Section */}
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No users yet</p>
        ) : (
          <div className={grid ? "grid grid-cols-3 gap-4" : "space-y-4"}>
            {users.map(u => (
              <div key={u.userID} className="border rounded-xl p-4 shadow hover:shadow-lg">
                <p><span className="font-semibold">Name:</span> {u.userName}</p>
                <p><span className="font-semibold">Age:</span> {u.userAge || "N/A"}</p>
                <p><span className="font-semibold">School:</span> {u.school || "N/A"}</p>
                <p><span className="font-semibold">Email:</span> {u.email || "N/A"}</p>
                <p><span className="font-semibold">Grade:</span> {u.grade || "N/A"}</p>

                {loggedIn && (
                  <button
                    onClick={() => setConfirmDelete({ show: true, id: u.userID, name: u.userName })}
                    className="mt-3 text-red-500 text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add User Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4 shadow-lg">
              <h2 className="text-lg font-semibold text-black">Add New User</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="p-2 border rounded text-black" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} />
                <input className="p-2 border rounded text-black" placeholder="Age" type="number" value={userAge} onChange={e => setUserAge(e.target.value)} />
                <input className="p-2 border rounded text-black" placeholder="Password" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                <input className="p-2 border rounded text-black" placeholder="School" value={school} onChange={e => setSchool(e.target.value)} />
                <input className="p-2 border rounded text-black" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className="p-2 border rounded text-black" placeholder="Grade" value={grade} onChange={e => setGrade(e.target.value)} />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={addUser}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDelete.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 shadow-lg">
              <h3 className="text-lg font-semibold text-black">Confirm Delete</h3>
              <p className="text-black">Are you sure you want to delete <span className="font-bold">{confirmDelete.name}</span>?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete({ show: false, id: null, name: "" })}
                  className="px-4 py-2 border text-black rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteUser(confirmDelete.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}