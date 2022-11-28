interface IGetMenu {
  code: string;
  data: IMenuData[];
  message: string;
  status: number;
  statusDetail: string;
  timestamp: string;
}

interface IMenuData {
  createdDate: string;
  description: string;
  id: number;
  menuImage: IPhoto | null;
  modifiedDate: string;
  name: string;
  price: number;
}
