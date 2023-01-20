import { useEffect, useState } from "react";
import { instance } from "libs/api/api";
import { useRouter } from "next/router";

function useGetBabfull() {
  const router = useRouter();
  const [babfullMenus, setBabfullMenus] = useState<IGetBabfullMenuData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getBabfull() {
    setIsLoading(true);
    const response = await instance.get<{}, IGetBabfullMenu>(
      `/admin/babfuls?isOldData=false`
    );
    setBabfullMenus(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getBabfull();
  }, []);

  async function modifyBabfullMenu(restaurantId?: number) {
    await instance
      .patch<{}, IPostBabfullMenu>(`/admin/babfuls/${restaurantId}`)
      .then((res) => {
        router.push("/Babfull");
      });
  }

  async function deleteBabfullMenu(restaurantId: number) {
    await instance.delete(`/admin/babfuls/${restaurantId}`);
    router.push("/Babfull");
    getBabfull();
  }

  return {
    babfullMenus,
    isLoading,
    modifyBabfullMenu,
    deleteBabfullMenu,
    getBabfull,
  };
}

export default useGetBabfull;
