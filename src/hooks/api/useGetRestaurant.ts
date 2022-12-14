import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { instance } from "libs/api/api";
import { restaurantState } from "store/restautantState";

function useGetRestaurant(page: number) {
  const [restaurants, setRestaurants] = useRecoilState(restaurantState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getRestaurant() {
    setIsLoading(true);
    const response = await instance.get<{}, IGetRestaurant>(
      `/admin/restaurants?page=${page}`

    );
    setRestaurants(response.data.content);
    setIsLoading(false);
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  async function createRestaurant() {
    await instance.post<{}, IPostRestaurantData>(`/admin/restaurants`);
    getRestaurant();
  }

  async function deleteRestaurant(restaurantId: number) {
    await instance.delete(`/admin/restaurants/${restaurantId}`);
    getRestaurant();
  }

  return { restaurants, isLoading, createRestaurant, deleteRestaurant };
}

export default useGetRestaurant;
