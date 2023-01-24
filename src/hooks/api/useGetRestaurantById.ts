import { useEffect, useState } from "react";
import { instance } from "libs/api/api";

interface IGetRestaurantById {
  data: IGetRestaurantDataContent;
}

interface UseGetRestaurantByIdProps {
  detailId: string | string[] | undefined;
}

function useGetRestaurantById({ detailId }: UseGetRestaurantByIdProps) {
  const [restaurant, setRestaurant] =
    useState<IGetRestaurantDataContent | null>(null);
  const [restaurantMenu, setRestaurantMenu] = useState<IMenuData[]>([]);
  const [babfullMenus, setBabfullMenus] =
    useState<IGetBabfullMenuDataContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getRestaurantById(id: string) {
    setIsLoading(true);
    const response = await instance.get<{}, IGetRestaurantById>(
      `/admin/restaurants/${id}`
    );
    const responseMenu = await instance.get<{}, IGetMenu>(
      `/admin/restaurants/${id}/menus`
    );

    setRestaurant(response.data);
    setRestaurantMenu(responseMenu.data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (typeof detailId === "string") getRestaurantById(detailId);
  }, [detailId, setRestaurant]);

  async function getBabfullById(id: string) {
    setIsLoading(true);
    const response = await instance.get<{}, IGetBabfullMenuDataContent>(
      `/admin/babfuls/${id}`
    );

    setBabfullMenus(response);
    setIsLoading(false);
  }

  useEffect(() => {
    if (typeof detailId === "string") getBabfullById(detailId);
  }, [detailId, setBabfullMenus]);

  return {
    restaurant,
    restaurantMenu,
    babfullMenus,
    isLoading,
  };
}

export default useGetRestaurantById;
