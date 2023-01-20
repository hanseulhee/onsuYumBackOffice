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

interface IPostMenu {
  description: string;
  menuImage: IPhoto;
  name: string;
  price: number;
}
