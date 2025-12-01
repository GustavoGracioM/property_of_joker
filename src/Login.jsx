import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("https://bc-afbq.onrender.com/auth/login", {
        password,
      });

      login(res.data.token);
      window.location.href = "/";
    } catch {
      alert("Senha incorreta!");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

      {/* Header */}
      <h1
        className="text-4xl mb-10 text-black"
        style={{ fontFamily: "'Grand Hotel', cursive" }}
      >
        Property of Joker
      </h1>

      {/* Card do Login */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a senha"
          className="
            w-full 
            px-4 
            py-3 
            rounded-lg 
            border 
            border-gray-300 
            focus:border-black 
            outline-none 
            text-sm
          "
        />

        <button
          type="submit"
          className="
            w-full 
            py-3 
            rounded-lg 
            bg-black 
            text-white 
            font-semibold 
            active:scale-95 
            transition
          "
        >
          Entrar
        </button>
      </form>

      {/* Rodapé opcional */}
      <p className="text-xs text-gray-500 mt-8">
        Acesso restrito 🔒
      </p>

    </div>
  );
}
