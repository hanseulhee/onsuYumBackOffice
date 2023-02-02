interface IPostRestaurantData {
  insideImage: IPhoto;
  latitude: number;
  location: string;
  longitude: number;
  name: string;
  outsideImage: IPhoto;
  phone: string;
  summary: string;
  time: string[];
}

interface IMenu {
  code: string;
  data: IPostMenu[];
  message: string;
  status: number;
  statusDetail: string;
  timestamp: string;
}

interface IPostMenu {
  description: string;
  menuImage: IPhoto | null;
  name: string;
  price: number;
}
