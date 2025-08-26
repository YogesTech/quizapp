import { useState } from "react";
import api from "../api";

export default function Register(){
  const [form,setForm] = useState({ name:"", email:"", password:"", role:"PARTICIPANT" });
  const [msg,setMsg] = useState("");

  const on = (e)=> setForm({...form,[e.target.name]:e.target.value});

  const submit = async(e)=>{
    e.preventDefault();
    try{
      await api.post("/auth/register", form);
      setMsg("Registered ✅ — check Mailtrap for welcome mail");
    }catch{
      setMsg("Register failed ❌");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input className="w-full border p-2 mb-2" name="name" placeholder="Name" value={form.name} onChange={on} />
      <input className="w-full border p-2 mb-2" name="email" placeholder="Email" value={form.email} onChange={on} />
      <input className="w-full border p-2 mb-2" type="password" name="password" placeholder="Password" value={form.password} onChange={on} />
      <select className="w-full border p-2 mb-3" name="role" value={form.role} onChange={on}>
        <option value="PARTICIPANT">PARTICIPANT</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button className="bg-green-600 text-white px-3 py-2 rounded">Register</button>
      <p className="mt-3 text-sm">{msg}</p>
    </form>
  );
}
