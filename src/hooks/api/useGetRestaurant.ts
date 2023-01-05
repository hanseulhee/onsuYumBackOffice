import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { instance } from "libs/api/api";
import { restaurantState } from "store/restautantState";

function useGetRestaurant() {
  const [restaurants, setRestaurants] = useRecoilState(restaurantState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getRestaurant() {
    setIsLoading(true);
    const response = await instance.get<{}, IGetRestaurant>(
      "/admin/restaurants"
    );

    console.log(response);
    setRestaurants(response.data.content);
    setIsLoading(false);
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  async function createRestaurant(restaurantId: number) {
    await instance.post(`/admin/restaurants/${restaurantId}`);
    getRestaurant();
  }

  async function deleteRestaurant(restaurantId: number) {
    await instance.delete(`/admin/restaurants/${restaurantId}`);
    getRestaurant();
  }

  return { restaurants, isLoading, createRestaurant, deleteRestaurant };
}

export default useGetRestaurant;
