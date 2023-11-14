export type OptionalObject<T> = {
  [key: string]: T;
};

export type Customer =
  | ({
      name: string;
    } & {
      email: string;
      phone?: string;
      taxId?: string;
      correlationId?: string;
    })
  | {
      email?: string;
      phone: string;
      taxId?: string;
      correlationId?: string;
    }
  | {
      email?: string;
      phone?: string;
      taxId: string;
      correlationId?: string;
    }
  | {
      email?: string;
      phone?: string;
      taxId?: string;
      correlationId: string;
    };
