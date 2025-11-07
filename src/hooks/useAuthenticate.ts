import type { CredentialsType } from "../interface/auth.type";

const useAuthenticate = () => {
  const signIn = async (credentials: CredentialsType) => {
    try {
      const response = await fetch("http://localhost:3004/api/cart", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        // Intenta parsear el error del backend si existe
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }

      // Si la respuesta no tiene contenido (ej. un 204 No Content de un logout)
      if (response.status === 204) {
        return null;
      }

      return response.json();
    } catch (error) {
      console.log("Error en auth: ", error);
    }
  };

  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:3004/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Intenta parsear el error del backend si existe
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`,
        );
      }

      // Si la respuesta no tiene contenido (ej. un 204 No Content de un logout)
      if (response.status === 204) {
        return null;
      }

      return response.json();
    } catch (error) {
      console.log("Error en auth: ", error);
    }
  };

  return { signIn, signOut };
};

export default useAuthenticate;
