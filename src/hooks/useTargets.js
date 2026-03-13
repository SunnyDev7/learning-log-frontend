import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../lib/api.js";

export function useTargets() {
  const queryClient = useQueryClient();

  const targetsQuery = useQuery({
    queryKey: ["targets"],
    queryFn: async () => {
      const response = await api.get("/api/targets/");
      return response.data.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.put("/api/targets/update", data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["targets"] });
      toast.success("Goals updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update goals");
    },
  });

  return {
    targets: targetsQuery.data,
    isLoading: targetsQuery.isLoading,
    updateTargets: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
