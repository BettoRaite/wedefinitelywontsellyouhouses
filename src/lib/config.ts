export const QUERY_KEYS = {
  FLOORS: "FLOORS",
  HOUSES: "HOUSES",
  COMPLEXES: "COMPLEXES",
  APARTMENTS: "APARTMENTS",
  getFloorsQueryKey(houseId: number) {
    return [this.FLOORS, houseId];
  },
  getFloorQueryKey(floorId: number) {
    return [this.FLOORS, floorId];
  },
  getFloorApartmentsQueryKey(floorId: number) {
    return [this.FLOORS, floorId, this.APARTMENTS];
  },
  getApartmentsQueryKey(floorId: number) {
    return [this.FLOORS, floorId, this.APARTMENTS];
  },
  getHouseQueryKey(houseId: number) {
    return [this.HOUSES, houseId];
  },
};
