const API_BASE_URL = import.meta.env.VITE_ADDRESS_API_URL;

export const addressFetch = async <T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    // Intenta parsear el error del backend si existe
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Error ${response.status}: ${response.statusText}`,
    );
  }

  // Si la respuesta no tiene contenido (ej. un 204 No Content de un logout)
  if (response.status === 204) {
    return null as T;
  }

  return response.json() as T;
};
