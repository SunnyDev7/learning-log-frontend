import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../lib/api.js";

export function useActivities(date) {
  const queryClient = useQueryClient();

  const activitiesQuery = useQuery({
    queryKey: ["activities", date],
    queryFn: async () => {
      const endpoint = date
        ? `/api/activities/date/${date}`
        : "/api/activities/";
      const response = await api.get(endpoint);
      return response.data.data;
    },
  });

  const logActivity = useMutation({
    mutationFn: (activityData) =>
      api.post("/api/activities/create", activityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: (id) => api.delete(`/api/activities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  return {
    activities: activitiesQuery.data,
    isLoading: activitiesQuery.isLoading,
    error: activitiesQuery.error,
    logActivity: (data) => logActivity.mutateAsync(data),
    deleteActivity: (id) => deleteActivity.mutate(id),
  };
}
