// possible db schemas

// It was so dumb to name it like this
export interface Image {
  id: number;
  url: string;
  type?: "rect" | "poly";
  // coords to be used to map the item on an Image
  coords?: number[];
  // this is used to normalize coords
  origImageWidth?: number;
  origImageHeight?: number;
}
// so i created a better named type

export interface ImageMapping {
  id: number | string;
  name?: string;
  imageUrl?: string;
  shapeType: "rect" | "poly" | "circle";
  color?: string;
  coordinates: number[];
  sourceImageWidth?: number;
  sourceImageHeight?: number;
  metadata?: Record<string, unknown>;
}

type FloorImage = Image & {
  floorId: number;
};
export interface FloorImageMapping extends ImageMapping {
  floorId: number;
}
export interface Floor {
  id: number;
  houseId: number;
  image: FloorImage;
  name?: string;
  floorNumber: number;
  imageMapping?: FloorImageMapping;
  // some additional info
}

type HouseImage = Image & {
  houseId: number;
};
type ImageMappingHouse = ImageMapping & {
  houseId: number;
};
export interface House {
  id: number;
  image?: HouseImage;
  name: string;
  address?: string;
  floors: Floor[];
  yearBuilt?: number;
  imageMapping?: ImageMappingHouse;
  // some additional info
}

type ImageMappingApartment = ImageMapping & {
  apartmentId: number;
};
export interface Apartment {
  id: number;
  // usually that would be floor id
  floorNumber: number;
  houseId: number;
  imageMapping?: ImageMappingApartment;
  apartmentNumber: string;
  rooms?: number;
  squareMeters?: number;
  isOccupied?: boolean;
  price: number;
  status?: "available" | "reserved" | "sold";
  // some additional info
}

// a group of multi-floor houses
export interface Complex {
  complexImageUrl: string;
  id: number;
  name: string;
  address: string;
  houses: House[];
  yearBuilt?: number;
  // some additional info
}
