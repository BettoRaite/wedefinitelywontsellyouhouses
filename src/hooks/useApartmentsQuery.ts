import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
// import { apiClient } from "@/lib/apiClient";
import { Apartment } from "@/lib/types";
import { QUERY_KEYS } from "@/lib/config";
import { mockApartments } from "@/lib/mockData";

// Why such complicated types??
// Actually I copied it from my prev project
// It's very useful as it let you to extract return type of query
// Based on the query action
type ApartmentsQueryAction =
  | { type: "apartments"; params?: string }
  | { type: "apartment"; id: number };

type ApartmentsQueryResult<T extends ApartmentsQueryAction> = T extends {
  type: "apartments";
}
  ? Apartment[]
  : T extends { type: "apartment" }
    ? Apartment
    : never;

export function useApartmentsQuery<T extends ApartmentsQueryAction>(
  action: T,
  options?: Partial<UseQueryOptions<ApartmentsQueryResult<T>>>,
): UseQueryResult<ApartmentsQueryResult<T>> {
  const queryKey = (() => {
    switch (action.type) {
      case "apartments":
        const params = new URLSearchParams(action.params);
        const floorNumber = Number.parseInt(
          params.get("floorNumber") as string,
        );
        return QUERY_KEYS.getFloorApartmentsQueryKey(floorNumber);
      case "apartment":
        return QUERY_KEYS.getApartmentsQueryKey(action.id);
      default:
        throw new Error(`Invalid action type: ${action as never}`);
    }
  })();
  return useQuery<ApartmentsQueryResult<T>>({
    ...options,
    queryKey,
    queryFn: () => {
      switch (action.type) {
        case "apartments": {
          //  mocking api
          const params = new URLSearchParams(action.params);
          const floorNumber = params.get("floorNumber");
          const apartments = mockApartments.filter(
            (a) => a.floorNumber === Number.parseInt(floorNumber as string),
          );
          return apartments as ApartmentsQueryResult<T>;
        }
        case "apartment": {
          const apartment = mockApartments.find((a) => a.id === action.id);
          return (apartment as ApartmentsQueryResult<T>) ?? null;
        }
      }
      // what would do in prod instead
      // const { data } = await apiClient.get(
      //   action.type === "apartments"
      //     ? `get-apartments-by-floor-piermont/${action.params ?? ""}`
      //     : `/apartments/${action.id}`,
      // );
      // return data as ApartmentsQueryResult<T>;
    },
  });
}
