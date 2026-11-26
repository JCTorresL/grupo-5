import type { InventoryQuery } from "../inventory/inventory.interface";

export type InventoryStatus = "disponible" | "pocas_existencias" | "agotado";

export interface ConversationMessage {
  role: "usuario" | "agente";
  text: string;
}

export interface ConversationsInterface {
  channel: "voz" | "texto";
  status: "activa" | "completado";
  intent: string;
  result: InventoryStatus;
  alerts: string[];
  startedAt: string;
  endedAt: string;
  query?: InventoryQuery;
  messages: ConversationMessage[];
}