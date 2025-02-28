export type UserEdit = {
  dateOfBirth?: string;
  email: string;
  firstName: string;
  gender: string;
  id?: string;
  lastName: string;
  location: Location;
  phone: string;
  picture?: string;
  registerDate?: string;
  title?: string;
  updatedDate?: string;
};

export type Location = {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
};
