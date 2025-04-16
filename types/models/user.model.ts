export type User = {
  id: string;
  name: string;
  // email: string;
  phone: string;
  token: string;
};

export type UserType = "customer" | "wholesaler" | "retailer";
