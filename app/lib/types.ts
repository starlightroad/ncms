export type Address = {
  street: string;
  city: string;
  state: string;
  zip: number;
};

export type Circuit = {
  id: number;
  name: string;
  capacity: string;
  type: string;
  location: {
    a: Address;
    z: Address;
  };
};
