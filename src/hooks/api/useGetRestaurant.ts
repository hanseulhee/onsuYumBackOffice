import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { instance } from "libs/api/api";
import { restaurantState } from "store/restautantState";
import { useRouter } from "next/router";

function useGetRestaurant() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useRecoilState(restaurantState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getRestaurant() {
    setIsLoading(true);
    const response = await instance.get<{}, IGetRestaurant>(
      "/admin/restaurants"
    );
    setRestaurants(response.data.content);
    setIsLoading(false);
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  async function deleteRestaurant(restaurantId: number) {
    await instance.delete(`/admin/restaurants/${restaurantId}`);
    router.push("/Restaurants");
    getRestaurant();
  }

  return {
    restaurants,
    isLoading,
    deleteRestaurant,
  };
}

export default useGetRestaurant;
