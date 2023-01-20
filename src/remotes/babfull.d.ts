interface IGetBabfullMenu {
  timestamp: string;
  status: number;
  statusDetail: string;
  code: string;
  message: string;
  data: IGetBabfullMenuData;
}

interface IGetBabfullMenuData {
  content: IGetBabfullMenuDataContent[];
  pageable: IPage;
  totalPage: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: ISort;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface IGetBabfullMenuDataContent {
  id: number;
  menuDate: string;
  foods: string[];
  deliciousFood: string;
  createdDate: string;
  modifiedDate: string;
}

interface IPostBabfullMenu {
  deliciousFood: string;
  foods: string[];
  menuDate: string;
}
