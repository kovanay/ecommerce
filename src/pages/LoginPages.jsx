import Input from "../components/Input";

const LoginPages = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form
        className="shadow-md p-8 rounded-2xl flex flex-col gap-4 min-w-100"
        method="POST"
      >
        <h1 className="text-center text-2xl">Inicio de Sesion</h1>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="TheName">
            Nombre
          </label>
          <input
            type="text"
            id="TheName"
            name="Name"
            className="border border-gray-400 rounded-md py-1 px-2"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm" htmlFor="Thepassword">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="Thepassword"
            className="border border-gray-400 rounded-md py-1 px-2"
            required
          />
        </div>
        <button
          type="submit"
          name="send"
          id="send"
          className="bg-fuchsia-800 text-white rounded-md py-1"
        >
          Enviar
        </button>
        <div className="flex flex-row gap-2">
          No tienes cuenta?{" "}
          <a className="text-fuchsia-800" href="">
            Registrarte!
          </a>
        </div>
        <div className="flex flex-row gap-2">
          Entrar como Admin{" "}
          <a className="text-fuchsia-800" href="">
            Entrar
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPages;
