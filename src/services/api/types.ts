export interface ApiResponse {
  results: User[];
  info: ApiInfo;
}

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DateOfBirth;
  registered: Registration;
  phone: string;
  cell: string;
  id: Identification;
  picture: Picture;
  nat: string;
}


export interface Name {
  title: string;
  first: string;
  last: string;
}


export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string | number; // Postcode can sometimes be a string or number
  coordinates: Coordinates;
  timezone: Timezone;
}


export interface Street {
  number: number;
  name: string;
}


export interface Coordinates {
  latitude: string;
  longitude: string;
}


export interface Timezone {
  offset: string;
  description: string;
}


export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}


export interface DateOfBirth {
  date: string; // ISO date string
  age: number;
}


export interface Registration {
  date: string; // ISO date string
  age: number;
}

export interface Identification {
  name: string;
  value: string | null; // Value can be null
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}


export interface ApiInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}
