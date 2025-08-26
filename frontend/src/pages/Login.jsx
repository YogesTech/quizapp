import { useState } from "react";
import api from "../api";

export default function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [msg,setMsg] = useState("");

  const submit = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await api.post("/auth/login",{email,password});
      localStorage.setItem("token", data.token); // save JWT for axios
      setMsg("Logged in ✅ (token saved)");
      window.location.href = "/"; // refresh navbar after login
    }catch{
      setMsg("Login failed ❌");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input className="w-full border p-2 mb-3" placeholder="Email"
        value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="w-full border p-2 mb-3" type="password" placeholder="Password"
        value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-black text-white px-3 py-2 rounded">Login</button>
      <p className="mt-3 text-sm">{msg}</p>
    </form>
  );
}
