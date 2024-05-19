export interface ICarusel {
  superLargeDesktop: {
    breakpoint: { max: number; min: number };
    items: number;
  };
  desktop: {
    breakpoint: { max: number; min: number };
    items: number;
  };
  tablet: {
    breakpoint: { max: number; min: number };
    items: number;
  };
  mobile: {
    breakpoint: { max: number; min: number };
    items: number;
  };
}

export interface ICardsMenu {
  icon: JSX.Element;
  label: string;
}

export interface ISidebarItem extends ICardsMenu {
  route: string;
}

export interface IRegisterForm {
  full_name: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
  isAdmin?: boolean;
}

export interface IActivateCode {
  email: string;
  activate_code: number;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  full_name: string;
  email: string;
  username: string;
  phone: string | null;
  image: string | null;
  is_admin: boolean;
}

export interface IToken {
  access: string;
  refresh: string;
}

export interface IResetPassword {
  email: string;
  activation_code: number;
  new_password: string;
  confirm_password: string;
}

export interface IDistrict {
  id: number;
  name: string;
  region: number;
}
export interface INeighborhood {
  id: number;
  name: string;
  district: number;
}
export interface IRegion {
  id: number;
  name: string;
}

export interface IMyRestaurant {
  id: number;
  name: string;
  price: string;
  phone: string;
  size_people: number;
  address: {
    id: number;
    mahalla: number;
    region: string;
    district: string;
    street: string;
    house: string;
  };
}

export type IRestaurant = {
  id: number;
  name: string;
  price: number;
  description: string;
  size_people: number;
  images: [
    {
      id: number;
      image: string;
    }
  ];
  address: {
    id: number;
    region: string;
    district: string;
    mahalla: number;
    street: string;
    house: string;
  };
};

export interface IRestaurantList {
  count: number;
  next: null | boolean;
  previous: null | boolean;
  results: IRestaurant[];
}

export interface ISearchParams {
  region_id: number;
  district_id: number;
}

export interface IMyBooking {
  id: number;
  name: string;
  price: number;
  phone: string | number;
  size_people: number;
  address: {
    id: number;
    mahalla: number;
    region: string;
    district: string;
    street: string;
    house: string;
  };
}

export type IUserData = {
  full_name: string;
  image: string;
};

export type IComment = {
  id: number;
  text: string;
  user: {
    username: string;
    image: string;
  };
  created_at: string;
};

export interface IRoomId extends IRestaurant {
  phone: string;
  services: number[];
  user: IUserData;
  comments: IComment[];
  comment_count: string;
}

export interface IServices {
  id: number;
  name: string;
  image: string;
}

export interface IPostComment {
  text: string;
  restaurant: number;
}
enum Status {
  pending,
  approved,
  rejected,
}

export interface IBooking {
  id: number;
  date: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  user: IUserData;
  restaurant: number;
  status: Status;
}

export interface ICheckDay {
  date: string;
  restaurant_id: number;
}

export interface ITime {
  morning_time: boolean;
  afternoon_time: boolean;
  evening_time: boolean;
}

export interface ICheckDayRes extends ITime {
  restaurant: number;
}

export interface IOrderOneDayRequest {
  date: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  restaurant: number;
  status?: string;
}

export interface IBookingAdmin {
  id: number;
  date: string;
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  user: IUserData;
  restaurant: number;
  status?: string;
}

export interface IAddress {
  mahalla: number;
  street: string;
  house: string;
  region?: string;
}

export interface IRestaurantRequest {
  name: string;
  price: string;
  description: string;
  phone: string;
  size_people: number;
  address: IAddress;
  services: number[];
  working_time: {
    morning_time: string;
    afternoon_time: string;
    evening_time: string;
  };
}
export interface IEditRestaurantRequest {
  name: string;
  price: string;
  description: string;
  phone: string;
  size_people: number;
  address: {
    mahalla: number;
    street: string;
    house: string;
  };
  services: number[];
  working_time: {
    morning_time: string;
    afternoon_time: string;
    evening_time: string;
  };
}
export interface IAdminMyBooking {
  customer: {
    full_name: string;
    image: string;
    phone: string;
  };
  date: string;
  id: number;
  restaurant_name: string;
  status: string;
  time: string[];
}

export interface IUserBooking {
  date: string;
  id: number;
  restaurant: { id: number; name: string; images: string[]; phone: string };
  status: string;
  time: string[];
}
