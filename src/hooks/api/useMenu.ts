import { useEffect, useState } from "react";
import { instance } from "libs/api/api";

interface UseGetMenuByIdProps {
  detailId: string | string[] | undefined;
}

function useMenu({ detailId }: UseGetMenuByIdProps) {
  const [menu, setMenu] = useState<IPatchMenuData | null>(null);

  async function getMenuById(id: string) {
    const response = await instance.get<{}, IPatchMenu>(`/admin/menus/${id}`);
    setMenu(response.data);
  }

  useEffect(() => {
    if (typeof detailId === "string") getMenuById(detailId);
  }, [detailId]);

  async function deleteMenu(menuId: number) {
    await instance.delete(`/admin/menus/${menuId}`);
  }

  async function deleteMenuImage(menuId: number) {
    await instance.delete(`/admin/menus/${menuId}/image`);
  }
  return {
    menu,
    deleteMenu,
    deleteMenuImage,
  };
}

export default useMenu;
