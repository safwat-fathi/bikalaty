export type User = {
  id: string;
  name: string;
  phone: string;
  token: string;
};

export enum UserType {
  Customer = "customer",
  Wholesaler = "wholesaler",
  Retailer = "retailer",
}
