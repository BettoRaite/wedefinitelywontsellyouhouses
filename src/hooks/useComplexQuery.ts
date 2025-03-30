"use client";
import { QUERY_KEYS } from "@/lib/config";
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { Complex } from "@/lib/types";
import { mockHouses } from "@/lib/mockData";

type ComplexQueryAction = { type: "complexes" };

type ComplexQueryResult<T extends ComplexQueryAction> = T extends {
  type: "complexes";
}
  ? Complex[]
  : never;

export default function useComplexQuery<T extends ComplexQueryAction>(
  action: T,
  options?: Partial<UseQueryOptions<ComplexQueryResult<T>>>,
): UseQueryResult<ComplexQueryResult<T>> {
  const queryKey = (() => {
    switch (action.type) {
      case "complexes":
        return [QUERY_KEYS.COMPLEXES];
      default:
        throw new Error(`Invalid action type: ${action as never}`);
    }
  })();

  return useQuery<ComplexQueryResult<T>>({
    ...options,
    queryKey,
    queryFn: async () => {
      const data: Complex = {
        complexImageUrl: "/images/broscomplex.jpeg",
        id: 1,
        name: "Luxury Residences",
        address: "123 Complex Lane, Beverly Hills, CA 90210",
        houses: mockHouses,
      };

      return [data] as ComplexQueryResult<T>;
    },
  });
}
