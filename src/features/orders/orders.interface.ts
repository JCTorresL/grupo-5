export interface Order {
  conversationId: string;
  fulfillmentMethod: "entregado" | "recogida en tienda";
  orderStatus: "registrado" | "en preparación" | "listo" | "entregado" | "cancelado";
  paymentStatus: "pendiente" | "pagado" | "reembolsado";
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