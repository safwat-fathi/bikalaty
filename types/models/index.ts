export enum UserType {
  Customer = "customer",
  Wholesaler = "wholesaler",
  Retailer = "retailer",
}

export interface User {
  id: number;
  name: string;
  email: string;
  user_type: UserType;
  password: string;
  phone?: string;
  default_address_id?: number;
}

export interface Address {
  id: number;
  user_id: number;
  title: string;
  line1: string;
  line2?: string;
  city: string;
  governorate: string;
  phone: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  product_count: number;
}

export interface Brand {
  id: number;
  name: string;
  image_url: string;
}

export interface Unit {
  id: number;
  name: string; // 'kg', 'liter', etc.
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  brand_id: number;
  unit_id: number;
  price_wholesaler: number;
  price_retailer: number;
  price_customer: number;
  min_wholesale_qty: number;
  min_retail_qty: number;
  stock: number;
  slug: string;
  image_url: string;
  variant_ids: number[];
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string; // e.g., "500g", "1L", "Large"
  additional_price: number; // price is price + additionalPrice for this variant
  image_url?: string;
}

export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  created_at: string; // ISO date
}

export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
}

export interface Cart {
  id: number; // one per user
  user_id: number;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  variant_id?: number; // For product variants (optional)
  quantity: number;
}

// export enum OrderStatus = "pending" | "confirmed" | "packed" | "shipped" | "delivered" | "cancelled";
export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Packed = "packed",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export interface ShippingMethod {
  id: number;
  name: string; // 'Standard Ground', 'Express Next-Day', etc.
  price: number;
  estimated_days: number;
}

export enum PaymentMethodType {
  CreditCard = "credit_card",

  CashOnDelivery = "cash_on_delivery",
}

export interface PaymentMethod {
  id: number;
  user_id: number;
  type: PaymentMethodType;
  details?: Record<string, any>;
}

export interface Coupon {
  id: number;
  code: string;
  type: "flat" | "percentage";
  value: number; // 10 means $10 if flat, or 10% if percentage
  valid_from: string; // ISO date
  valid_to: string; // ISO date
  usage_limit: number; // Total uses
  used_count: number;
}

export interface Order {
  id: number;
  user_id: number;
  shipping_address_id: number;
  payment_method_id: number;
  coupon_id?: number;
  status: OrderStatus;
  total: number;
  shipping_method_id: number;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id?: number;
  quantity: number;
  price_at_purchase: number; // unit price at order time
}
