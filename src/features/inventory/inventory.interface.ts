export type InventoryStatus = "disponible" | "pocas_existencias" | "agotado";

export interface ProductInterface {
  sku: string;
  product: string;
  color: string;
  size: string;
  branch: string;
  availableUnits: number;
  lastUpdated: string;
  inventoryStatus: InventoryStatus;
}

export interface InventoryQuery {
  sku: string;
  branch: string;
  availableUnits: number;
  recordId: string;
  lastUpdated: string;
}