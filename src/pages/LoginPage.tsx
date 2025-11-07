import { type FormEvent, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { type FormLoginType } from "../interface/auth.type";

const LoginPages = () => {
  const { login } = useAuth();


  const [formData, setFormData] = useState<FormLoginType>({
    password: '',
    email: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login({ email: formData.email.trim(), password: formData.password.trim() })
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-neutral-100 via-neutral-200 to-neutral-300">
      <form
        onSubmit={onSubmit}
        method="POST"
        className="bg-white/70 backdrop-blur-xl shadow-2xl p-10 rounded-3xl flex flex-col gap-6 w-80 border border-neutral-300 transition-all hover:shadow-neutral-500/30"
      >
        <h1 className="text-center text-3xl font-serif tracking-wide text-neutral-800">
          Iniciar Sesión
        </h1>

        {/* Nombre */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm text-neutral-700 tracking-wide"
          >

          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-neutral-400 focus:border-neutral-700 rounded-md py-2 px-3 text-neutral-800 bg-transparent outline-none transition duration-300"
            placeholder="Correo electronico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contraseña */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm text-neutral-700 tracking-wide"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-neutral-400 focus:border-neutral-700 rounded-md py-2 px-3 text-neutral-800 bg-transparent outline-none transition duration-300"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-neutral-800 hover:bg-neutral-900 text-white rounded-full py-2 mt-2 font-medium tracking-wide transition duration-300 cursor-pointer"
        >
          Entrar
        </button>

        {/* Enlaces */}
        <div className="text-sm flex flex-col items-center gap-1 mt-3 text-neutral-700">
          <p>
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-neutral-900 underline hover:text-neutral-600 transition"
            >
              Regístrate
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPages;
