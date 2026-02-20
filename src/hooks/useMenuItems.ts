import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { MenuCategory, CreateMenuItemInput, UpdateMenuItemInput } from "@/types/menu";
import * as menuService from "@/services/menuService";

const MENU_KEY = "menuItems";

export function useMenuItems(category?: MenuCategory) {
  return useQuery({
    queryKey: [MENU_KEY, category ?? "all"],
    queryFn: () => menuService.getMenuItems(category),
  });
}

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: [MENU_KEY, id],
    queryFn: () => menuService.getMenuItem(id),
    enabled: !!id,
  });
}

export function useCreateMenuItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMenuItemInput) => menuService.createMenuItem(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [MENU_KEY] }),
  });
}

export function useUpdateMenuItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateMenuItemInput }) =>
      menuService.updateMenuItem(id, input),
    onSuccess: () => qc.invalidateQueries({ queryKey: [MENU_KEY] }),
  });
}

export function useDeleteMenuItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => menuService.deleteMenuItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [MENU_KEY] }),
  });
}
