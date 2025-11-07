import type { ApiStatus } from "../interface/status.types";

export const STATUS_DISPLAY_MAP: Record<ApiStatus, string> = {
  active: "Activo",
  inactive: "Inactivo",
  pending: "Pendiente",
  banned: "Bloqueado",
};

export const STATUS_COLOR_MAP: Record<ApiStatus, string> = {
  active: "bg-green-200 border-green-800 text-green-600",
  inactive: "bg-red-200 border-red-800 text-red-600",
  pending: "bg-yellow-200 border-yellow-800 text-yellow-600",
  banned: "bg-gray-200 border-gray-800 text-gray-800",
};
