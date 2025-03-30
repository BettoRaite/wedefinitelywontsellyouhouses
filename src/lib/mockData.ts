import { Floor, Apartment, House } from "./types";
import { generateRandomColor } from "./utils/genRandColor";

export const mockFloors: Floor[] = [
  {
    id: 1,
    houseId: 1,
    image: {
      id: 1,
      floorId: 1,
      url: "/images/planb.png",
    },
    name: "Floor 3",
    floorNumber: 3,
    imageMapping: {
      floorId: 1,
      id: 1,
      coordinates: [
        991, 488, 1110, 480, 1254, 493, 1247, 466, 1111, 453, 986, 461,
      ],
      sourceImageWidth: 1920,
      sourceImageHeight: 1280,
      shapeType: "poly",
      color: "rgba(185, 145, 106, 0.5)",
    },
    // some additional info
  },
  {
    id: 2,
    houseId: 1,
    image: {
      id: 2,
      floorId: 2,
      url: "/images/planb.png",
    },
    name: "Floor 4",
    floorNumber: 4,
    // some additional info
  },
  {
    id: 3,
    houseId: 1,
    image: {
      id: 3,
      floorId: 3,
      url: "/images/planb.png",
    },
    name: "Floor 5",
    floorNumber: 5,
    imageMapping: {
      floorId: 3,
      id: 3,
      coordinates: [
        981, 417, 1114, 404, 1246, 426, 1246, 400, 1113, 375, 979, 397,
      ],
      sourceImageWidth: 1920,
      sourceImageHeight: 1280,
      shapeType: "poly",
      color: "rgba(185, 145, 106, 0.5)",
    },
    // some additional info
  },
  {
    id: 4,
    houseId: 1,
    image: {
      id: 4,
      floorId: 4,
      url: "/images/planb.png",
    },
    name: "Floor 6",
    floorNumber: 6,
    // some additional info
  },
  {
    id: 5,
    houseId: 1,
    image: {
      id: 5,
      floorId: 5,
      url: "/images/planb.png",
    },
    name: "Floor 7",
    floorNumber: 7,

    // some additional info
  },
  {
    id: 6,
    houseId: 1,
    image: {
      id: 6,
      floorId: 6,
      url: "/images/planb.png",
    },
    name: "Floor 8",
    floorNumber: 8,
    // some additional info
  },
  {
    id: 7,
    houseId: 1,
    image: {
      id: 7,
      floorId: 7,
      url: "/images/planb.png",
    },
    name: "Floor 9",
    floorNumber: 9,
  },
];

export const mockApartments: Apartment[] = [
  // Floor 3
  {
    id: 1,
    floorNumber: 3,
    houseId: 1,
    apartmentNumber: "3A",
    rooms: 2,
    squareMeters: 65,
    isOccupied: false,
    price: 180000,
    status: "available",
    imageMapping: {
      id: 1,
      apartmentId: 1,
      shapeType: "rect",
      coordinates: [120, 80, 220, 180],
      sourceImageWidth: 2526,
      sourceImageHeight: 1787,
      color: generateRandomColor(0.5), // Green for available
    },
  },

  // Floor 4
  {
    id: 2,
    floorNumber: 4,
    houseId: 1,
    apartmentNumber: "4A",
    rooms: 3,
    squareMeters: 85,
    isOccupied: false,
    price: 240000,
    status: "available",
    imageMapping: {
      id: 2,
      apartmentId: 2,
      shapeType: "rect",
      coordinates: [793, 794, 1226, 974],
      sourceImageWidth: 2526,
      sourceImageHeight: 1787,
      color: generateRandomColor(0.5),
    },
  },

  // Floor 5 (complete example)
  {
    id: 3,
    floorNumber: 5,
    houseId: 1,
    apartmentNumber: "5A",
    rooms: 2,
    squareMeters: 70,
    isOccupied: true,
    price: 190000,
    status: "available",
    imageMapping: {
      id: 3,
      apartmentId: 3,
      coordinates: [580, 65, 1032, 602],
      sourceImageHeight: 1787,
      sourceImageWidth: 2526,
      shapeType: "rect",
      color: generateRandomColor(0.3), // Red for sold
    },
  },
  {
    id: 15,
    floorNumber: 5,
    houseId: 1,
    apartmentNumber: "15A",
    rooms: 2,
    squareMeters: 70,
    isOccupied: true,
    price: 190000,
    status: "reserved",
    imageMapping: {
      id: 15,
      apartmentId: 15,
      coordinates: [
        1045, 610, 1261, 610, 1261, 369, 1366, 376, 1364, 558, 1477, 563, 1473,
        55, 1043, 64,
      ],
      sourceImageHeight: 1787,
      sourceImageWidth: 2526,
      shapeType: "poly",
      color: generateRandomColor(0.3), // Red for sold
    },
  },
  // Floor 6
  {
    id: 4,
    floorNumber: 6,
    houseId: 1,
    apartmentNumber: "6A",
    rooms: 4,
    squareMeters: 120,
    isOccupied: false,
    price: 320000,
    status: "available",
    imageMapping: {
      id: 4,
      apartmentId: 4,
      shapeType: "rect",
      coordinates: [1488, 55, 1918, 575],
      sourceImageWidth: 2526,
      sourceImageHeight: 1787,
      color: generateRandomColor(0.5),
    },
  },

  // Floor 7
  {
    id: 5,
    floorNumber: 7,
    houseId: 1,
    apartmentNumber: "7A",
    rooms: 3,
    squareMeters: 95,
    isOccupied: false,
    price: 260000,
    status: "reserved",
    imageMapping: {
      id: 5,
      apartmentId: 5,
      shapeType: "rect",
      coordinates: [43, 775, 602, 1719],
      sourceImageWidth: 2526,
      sourceImageHeight: 1787,
      color: generateRandomColor(0.5), // Amber for reserved
    },
  },

  // Floor 8
  {
    id: 6,
    floorNumber: 8,
    houseId: 1,
    apartmentNumber: "8A",
    rooms: 2,
    squareMeters: 65,
    isOccupied: false,
    price: 175000,
    status: "available",
  },

  // Floor 9
  {
    id: 7,
    floorNumber: 9,
    houseId: 1,
    apartmentNumber: "9A",
    rooms: 3,
    squareMeters: 90,
    isOccupied: false,
    price: 250000,
    status: "available",
    imageMapping: {
      id: 7,
      apartmentId: 7,
      shapeType: "rect",
      coordinates: [140, 60, 240, 160],
      sourceImageWidth: 2526,
      sourceImageHeight: 1787,
      color: generateRandomColor(0.5),
    },
  },
];

export const mockHouses: House[] = [
  {
    name: "Building A",
    yearBuilt: new Date().getTime(),
    floors: mockFloors,
    id: 1,
    address: "123 Main Street, Unit A",
  },
  {
    name: "Building B",
    yearBuilt: new Date().getTime(),
    floors: [],
    id: 2,
    imageMapping: {
      houseId: 2,
      id: 2,
      coordinates: [
        767, 690, 766, 1001, 930, 1101, 1089, 1017, 1091, 702, 904, 675,
      ],
      sourceImageWidth: 1920,
      sourceImageHeight: 1280,
      shapeType: "poly",
      color: "rgba(255,255,255,0.4)",
    },
    address: "123 Main Street, Unit A",
  },
];
