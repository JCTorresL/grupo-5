//* Inventary
export type InventoryStatus = "available" | "low_stock" | "out_of_stock";

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

//* Conversation
export interface ConversationMessage {
  role: "user" | "agent";
  text: string;
}

export interface ConversationsInterface {
  channel: "voice" | "text";
  status: "active" | "completed";
  intent: string;
  result: InventoryStatus;
  alerts: string[];
  startedAt: string;
  endedAt: string;
  query?: InventoryQuery;
  messages: ConversationMessage[];
}


//* Order
export interface Order {
  conversationId: string;
  fulfillmentMethod: "delivery" | "store_pickup";
  orderStatus: "registered" | "preparing" | "ready" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
  products: OrderItem[];
  currency: "COP";
  productsSubtotal: number;
  deliveryFee: number;
  totalPrice: number;
  customer: Customer;
  dispatchBranch: DispatchBranch;
}

export interface DispatchBranch {
  id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  sku: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export interface Customer {
  email: string;
  phone: string;
  address: string;
}



