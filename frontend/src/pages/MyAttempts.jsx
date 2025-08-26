import { useEffect, useState } from "react";
import api from "../api";

export default function MyAttempts(){
  const [items,setItems] = useState([]);
  const [msg,setMsg] = useState("");

  useEffect(()=>{ 
    (async()=>{
      try{ 
        const {data} = await api.get("/attempts/my"); 
        setItems(data); 
      }catch{ 
        setMsg("Load failed (login first?)"); 
      }
    })(); 
  },[]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">My Attempts</h3>
      {msg && <p className="text-sm mb-2">{msg}</p>}
      <ul className="list-disc pl-6">
        {items.map(a => (
          <li key={a.id} className="mb-1 text-sm">
            Attempt #{a.id} — Quiz #{a.quiz?.id ?? a.quizId} — Score: {a.score ?? "N/A"}
          </li>
        ))}
      </ul>
    </div>
  );
}
