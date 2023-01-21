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

interface IMenuModify {
  description: string;
  name: string;
  price: number;
}

interface IMenuImageModify {
  menuImage: IPhoto;
}

interface IPatchMenu {
  code: string;
  data: IPatchMenuData;
  message: string;
  status: number;
  statusDetail: string;
  timestamp: string;
}

interface IPatchMenuData {
  createdDate: string;
  description: string;
  id: number;
  menuImage: IPhoto | null;
  modifiedDate: string;
  name: string;
  price: number;
}
