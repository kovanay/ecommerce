import type { ElementType } from "react";
import {
  CheckCircle, // active
  XCircle, // inactive, cancelled
  Clock, // pending
  Ban, // banned
  CreditCard, // pending_payment
  RefreshCw, // processing
  Truck, // shipped
  PackageCheck, // delivered
  Undo2,
  ListTodo, // refunded
} from "lucide-react";
import type { ApiStatus } from "../interface/status.types";

export const STATUS_DISPLAY_MAP: Record<ApiStatus, string> = {
  all: "Todo",
  active: "Activo",
  inactive: "Inactivo",
  pending: "Pendiente",
  banned: "Bloqueado",
  pending_payment: "Pago pendiente",
  processing: "En Proceso",
  shipped: "Enviado",
  delivered: "Entregado",
  refunded: "Devuelto",
  cancelled: "Cancelado",
};

export const STATUS_COLOR_MAP: Record<ApiStatus, string> = {
  all: "",
  active: "bg-green-200 border-green-800 text-green-600",
  inactive: "bg-red-200 border-red-800 text-red-600",
  pending: "bg-yellow-200 border-yellow-800 text-yellow-600",
  banned: "bg-gray-200 border-gray-800 text-gray-800",
  pending_payment: "text-yellow-600",
  processing: "text-blue-600",
  shipped: "text-cyan-600",
  delivered: "text-green-600",
  refunded: "text-amber-600",
  cancelled: "text-red-600",
};

export const STATUS_ICON_MAP: Record<ApiStatus, ElementType> = {
  all: ListTodo,
  active: CheckCircle,
  inactive: XCircle,
  pending: Clock,
  banned: Ban,
  pending_payment: CreditCard,
  processing: RefreshCw,
  shipped: Truck,
  delivered: PackageCheck,
  refunded: Undo2,
  cancelled: XCircle,
};
