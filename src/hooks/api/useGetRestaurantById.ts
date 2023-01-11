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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getRestaurantById(id: string) {
      setIsLoading(true);
      const response = await instance.get<{}, IGetRestaurantById>(
        `/admin/restaurants/${id}`
      );
      const responseMenu = await instance.get<{}, IGetMenu>(
        `/admin/restaurants/${response.data.id}/menus`
      );

      setRestaurant(response.data);
      setRestaurantMenu(responseMenu.data);
      setIsLoading(false);
    }

    if (typeof detailId === "string") getRestaurantById(detailId);
  }, [detailId, setRestaurant]);

  return {
    restaurant,
    restaurantMenu,
    isLoading,
  };
}

export default useGetRestaurantById;
