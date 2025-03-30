"use client";
// hooks/useHousesQuery.ts
import { QUERY_KEYS } from "@/lib/config";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { House } from "@/lib/types";
import { mockHouses } from "@/lib/mockData";

type HousesQueryAction = { type: "house"; id: number };

type HousesQueryResult<T extends HousesQueryAction> = T extends {
  type: "house";
}
  ? House
  : never;

export default function useHousesQuery<T extends HousesQueryAction>(
  action: T,
  options?: Partial<UseQueryOptions<HousesQueryResult<T>>>,
): UseQueryResult<HousesQueryResult<T>> {
  const queryKey = (() => {
    switch (action.type) {
      case "house":
        return QUERY_KEYS.getHouseQueryKey(action.id);
      default:
        throw new Error(`Invalid action type: ${action as never}`);
    }
  })();

  return useQuery<HousesQueryResult<T>>({
    ...options,
    queryKey,
    queryFn: async () => {
      // Mock data for houses
      return mockHouses[0] as HousesQueryResult<T>;
    },
  });
}
