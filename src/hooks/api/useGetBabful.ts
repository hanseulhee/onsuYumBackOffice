import { useEffect, useState } from "react";
import { instance } from "libs/api/api";

function useGetBabful() {
  const [babfullMenus, setBabfullMenus] = useState<IGetBabfulsMenuData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getRestaurant() {
    setIsLoading(true);
    const response = await instance.get<{}, IGetBabfulsMenu>(
      "/admin/babfuls?isOldData=false"
    );
    setBabfullMenus(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getRestaurant();
  }, []);

  return { babfullMenus, isLoading };
}

export default useGetBabful;
