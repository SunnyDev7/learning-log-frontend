import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../lib/api.js";

export function useCategories() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/api/categories/");
      return response.data.data;
    },
  });

  const addCategory = useMutation({
    mutationFn: (categoryData) =>
      api.post("/api/categories/create", categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }) => api.put(`/api/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id) => api.delete(`/api/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories: categoriesQuery.data || [],
    isLoading: categoriesQuery.isLoading,
    error: categoriesQuery.error,
    addCategory: (data) => addCategory.mutate(data),
    updateCategory: (id, data) => updateCategory.mutate({ id, data }),
    deleteCategory: (id) => deleteCategory.mutate(id),
  };
}
