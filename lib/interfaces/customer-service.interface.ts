export type Customer =
  | ({
      name: string;
      address?: Address;
      correlationID?: string;
    } & {
      email: string;
      phone?: string;
      taxId?: string;
    })
  | {
      email?: string;
      phone: string;
      taxId?: string;
    }
  | {
      email?: string;
      phone?: string;
      taxId: string;
    };

export type Address = {
  zipcode?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  complement?: string;
  country?: string;
};

export type CustomerCreateBody = Customer;
