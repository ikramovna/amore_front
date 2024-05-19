import customAxios from "@/services/axios";
import {
  IActivateCode,
  IBooking,
  ICheckDay,
  ICheckDayRes,
  IDistrict,
  IEditRestaurantRequest,
  ILoginForm,
  IMyRestaurant,
  INeighborhood,
  IOrderOneDayRequest,
  IPostComment,
  IRegion,
  IRegisterForm,
  IResetPassword,
  IRestaurant,
  IRestaurantList,
  IRestaurantRequest,
  IRoomId,
  ISearchParams,
  IServices,
} from "@/interface";

export const setRegister = (data: IRegisterForm) => {
  return customAxios.post("/user/register", data);
};

export const activateRegisterCode = (data: IActivateCode) => {
  return customAxios.post("/user/activate-code", data);
};

export const setLogin = (data: ILoginForm) => {
  return customAxios.post("/user/login", data);
};

export const getUser = () => {
  return customAxios.get("/user/");
};

export const resetEmail = (email: string) => {
  return customAxios.post("/user/reset-password", { email });
};

export const confirmPassword = (data: IResetPassword) => {
  return customAxios.post("/user/reset-password-confirm", { ...data });
};

export const getRegions = (): Promise<{ data: IRegion[] }> => {
  return customAxios.get("/region");
};

export const getDistricts = (
  region_id: number
): Promise<{ data: IDistrict[] }> => {
  return customAxios.get("/district", { params: { region_id } });
};

export const getNeighborhood = (
  district_id: number
): Promise<{ data: INeighborhood[] }> => {
  return customAxios.get("/mahalla", { params: { district_id } });
};

export const getAllRestaurant = ({
  page,
  page_size,
}: {
  page: number;
  page_size: number;
}): Promise<{ data: IRestaurantList }> => {
  return customAxios.get("/restaurant/list", { params: { page, page_size } });
};

export const getSearchData = ({
  district_id,
  region_id,
}: ISearchParams): Promise<{
  data: IRestaurant[];
}> => {
  return customAxios.get("/search", {
    params: { district_id, region_id },
  });
};

export const changeUserData = (formData: FormData) => {
  return customAxios.put("/user/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRoomId = (id: string): Promise<{ data: IRoomId }> => {
  return customAxios.get(`/restaurant/detail/${id}`);
};

export const getServices = (): Promise<{ data: IServices[] }> => {
  return customAxios.get(`/service`);
};

export const postComment = (data: IPostComment) => {
  return customAxios.post(`/comment`, data);
};

export const bookingRoomId = (): Promise<{ data: IBooking[] }> => {
  return customAxios.get(`/booking/my`);
};

export const checkDay = ({
  date,
  restaurant_id,
}: ICheckDay): Promise<{ data: ICheckDayRes[] }> => {
  return customAxios.get(`/booking/free`, {
    params: { date, restaurant_id },
  });
};

export const orederOneDay = (
  data: IOrderOneDayRequest
): Promise<{ data: IOrderOneDayRequest }> => {
  return customAxios.post(`/booking`, data);
};

export const getBooking = () => {
  return customAxios.get("/booking/my");
};

export const getMyRestaurants = (): Promise<{ data: IMyRestaurant[] }> => {
  return customAxios.get("/restaurant/my");
};

export const restaurantCreate = (data: IRestaurantRequest) => {
  return customAxios.post("/restaurant", data);
};

export const restaurantImage = (formData: any) => {
  return customAxios.post("/restaurant/image", formData, {
    headers: {
      " Content-Type": "multipart/form-data",
    },
  });
};

export const deleteRestaurantReq = (id: number) => {
  return customAxios.delete(`/restaurant/${id}`);
};

export const getNeighborhoodEdit = (): Promise<{ data: INeighborhood[] }> => {
  return customAxios.get("/mahalla");
};

export const putImage = (id: number, data: FormData) => {
  return customAxios.put(`/restaurant/image/${id}`, data, {
    headers: {
      " Content-Type": "multipart/form-data",
    },
  });
};

export const deleteRestaurantImage = (id: number) => {
  return customAxios.delete(`/restaurant/image/${id}`);
};

export const putRestaurant = (id: number, data: IEditRestaurantRequest) => {
  return customAxios.put(`/restaurant/${id}`, data);
};
