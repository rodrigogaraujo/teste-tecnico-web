export type User = {
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  location: {
    street: string;
    city: string; 
    state: string; 
    country: string;
    timezone: string;
  }
  phone: string;
  picture: string;
  registerDate: string;
  title: string;
  updatedDate: string;
};