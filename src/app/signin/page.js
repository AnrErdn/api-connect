"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    if (!data.success) return alert(data.message);

    localStorage.setItem("auth", "true");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-3">
        <h1 className="text-xl font-bold text-black">Sign In</h1>
        <input
          className="border p-2 w-full text-black"
          placeholder="Username or Email"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
        />
        <input
          className="border p-2 w-full text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login} className="w-full bg-black text-white py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}