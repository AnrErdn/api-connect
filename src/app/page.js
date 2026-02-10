"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");

  const fetchUsers = () => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) setUsers(data.data);
        else setUsers([]);
      })
      .catch(() => setUsers([]));
  };

  useEffect(() => { fetchUsers(); }, []);

  const addUser = () => {
    if (!userName) return alert("Please enter a name");
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, userAge, userPassword, school, email, grade }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUserName(""); setUserAge(""); setUserPassword(""); setSchool(""); setEmail(""); setGrade("");
          fetchUsers();
        } else alert(data.message || "Failed to add user");
      });
  };

  const deleteUser = (id) => {
    if (!confirm("Delete this user?")) return;
    fetch(`/api/users?id=${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(data => { if (data.success) fetchUsers(); else alert(data.message || "Failed to delete user"); });
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 font-sans">
      <h1 className="text-2xl font-bold text-center">User Management</h1>

      {/* Add User Form */}
      <div className="border p-4 rounded space-y-3 bg-gray-50">
        <h2 className="font-semibold text-gray-600">Add New User</h2>
        <input className="w-full p-2 border rounded text-gray-600" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} />
        <input className="w-full p-2 border rounded text-gray-600" placeholder="Age" type="number" value={userAge} onChange={e => setUserAge(e.target.value)} />
        <input className="w-full p-2 border rounded text-gray-600" placeholder="Password" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
        <input className="w-full p-2 border rounded text-gray-600" placeholder="School" value={school} onChange={e => setSchool(e.target.value)} />
        <input className="w-full p-2 border rounded text-gray-600" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded text-gray-600" placeholder="Grade (e.g., 12th)" value={grade} onChange={e => setGrade(e.target.value)} />
        <button onClick={addUser} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Add User</button>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg text-gray-600">Existing Users</h2>
        {users.length === 0 ? <p className="text-gray-600">No users found.</p> :
          users.map(user => (
            <div key={user.userID} className="border p-3 rounded bg-gray-50 shadow-sm">
              <p className="text-gray-600"><strong>Username:</strong> {user.userName}</p>
              <p className="text-gray-600"><strong>Age:</strong> {user.userAge || "N/A"}</p>
              <p className="text-gray-600"><strong>School:</strong> {user.school || "N/A"}</p>
              <p className="text-gray-600"><strong>Email:</strong> {user.email || "N/A"}</p>
              <p className="text-gray-600"><strong>Grade:</strong> {user.grade || "N/A"}</p>
              <button
                onClick={() => deleteUser(user.userID)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
