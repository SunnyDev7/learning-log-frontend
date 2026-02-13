import { useQuery } from "@tanstack/react-query";

import api from "../lib/api.js";

export function useStats() {
  const dashboardQuery = useQuery({
    queryKey: ["stats", "dashboard"],
    queryFn: async () => {
      const response = await api.get("/api/stats/dashboard");
      return response.data.data;
    },
  });

  const weeklyQuery = useQuery({
    queryKey: ["stats", "weekly"],
    queryFn: async () => {
      const response = await api.get("/api/stats/weekly");
      return response.data.data;
    },
  });

  const targetsQuery = useQuery({
    queryKey: ["targets"],
    queryFn: async () => {
      const response = await api.get("/api/targets/");
      return response.data.data;
    },
  });

  // Calculate weekly totals
  const weeklyTotalsByCategory = {};
  if (weeklyQuery.data?.days) {
    weeklyQuery.data.days.forEach((day) => {
      Object.entries(day.categories).forEach(([catId, minutes]) => {
        weeklyTotalsByCategory[catId] =
          (weeklyTotalsByCategory[catId] || 0) + minutes;
      });
    });
  }

  const totalWeeklyMinutes = Object.values(weeklyTotalsByCategory).reduce(
    (a, b) => a + b,
    0,
  );
  const totalWeeklyHours = totalWeeklyMinutes / 60;

  return {
    stats: dashboardQuery.data,
    weeklyData: weeklyQuery.data?.days || [],
    weeklyActiveDays: weeklyQuery.data?.activeDays || 0,
    weeklyTotalsByCategory,
    totalWeeklyHours,
    targets: targetsQuery.data,
    categories: weeklyQuery.data?.categories || [],
    isLoading: dashboardQuery.isLoading || weeklyQuery.isLoading,
    error: dashboardQuery.error || weeklyQuery.error,
  };
}
