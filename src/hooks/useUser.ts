import { UserType } from "../interface/user.type";

const useUser = () => {
  const userFetch = async (): Promise<UserType | undefined> => {
    try {
      const response = await fetch('http://localhost:3001/api/users/me', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      if (response.status === 204) {
        return undefined;
      }

      return response.json();
    } catch (error) {
      console.log("Error al obtener los datos del usuairo: ", error);
    }
  }
  return { userFetch }
}

export default useUser;
