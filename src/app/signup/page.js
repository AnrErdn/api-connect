"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    userName:"",
    userAge:"",
    userPassword:"",
    school:"",
    email:"",
    grade:""
  });

  const update = (k,v)=> setForm({...form,[k]:v});

  const signup = async () => {
    const res = await fetch("/api/users",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    const data = await res.json();
    if(!data.success) return alert("Failed");

    localStorage.setItem("auth","true");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-2">
        <h1 className="text-xl font-bold text-black">Create account</h1>

        <input className="border p-2 w-full text-black" placeholder="Username" onChange={e=>update("userName",e.target.value)} />
        <input className="border p-2 w-full text-black" type="number" placeholder="Age" onChange={e=>update("userAge",e.target.value)} />
        <input className="border p-2 w-full text-black" type="password" placeholder="Password" onChange={e=>update("userPassword",e.target.value)} />
        <input className="border p-2 w-full text-black" placeholder="School" onChange={e=>update("school",e.target.value)} />
        <input className="border p-2 w-full text-black" placeholder="Email" onChange={e=>update("email",e.target.value)} />
        <input className="border p-2 w-full text-black" placeholder="Grade" onChange={e=>update("grade",e.target.value)} />

        <button onClick={signup} className="w-full bg-black text-white py-2 rounded mt-2">
          Sign up
        </button>
      </div>
    </div>
  );
}