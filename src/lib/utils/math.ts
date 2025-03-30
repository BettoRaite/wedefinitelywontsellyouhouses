import { ImageMapping } from "../types";

/**
 * Calculates the max dist between x pairs and y pairs, then uses rectangle formula to find the center.
 * @param coords - x and y pairs
 * @returns returns average between two Xs and Ys coords
 */
export function getPolygonCenter(coords: number[]) {
  if (coords.length === 0) return [0, 0];

  const xCoords = coords.filter((_, i) => i % 2 === 0);
  const yCoords = coords.filter((_, i) => i % 2 !== 0);

  const minX = Math.min(...xCoords);
  const maxX = Math.max(...xCoords);
  const minY = Math.min(...yCoords);
  const maxY = Math.max(...yCoords);
  const centexX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  return [centexX, centerY];
}
/**
 * Uses a simple formula *(x + x1) / 2*, e.g *(50 + 100) / 2 = 75* to find the average of rectangle
 * @param coords - x and y pairs
 * @returns returns average between two Xs and Ys coords
 */
export function getRectCenter(coords: number[]) {
  const [x1, y1, x2, y2] = coords;
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;
  return [centerX, centerY];
}

export function normalizeImageMapping(
  imageMapping: ImageMapping,
  container: HTMLImageElement | HTMLDivElement,
) {
  const {
    sourceImageWidth = 0,
    sourceImageHeight = 0,
    coordinates = [],
  } = imageMapping;
  // Why do we need to normalize coords?? Suppose a person in charge of maps has a screen 1980x1280
  // So he creates maps, the client(user) gets the maps but he/she uses a screen of 1280x1020(or whatever)
  // since points were create for screen 1980x1280, like a rect with data [1500, 1500, 1800, 1800]
  // it won't work, unless data is normalized
  const normalizedCoords = coordinates.map((coord, i) => {
    if (i % 2 === 0) {
      // targeting x cood
      return (coord / sourceImageWidth) * container.clientWidth;
    }
    // targeting y cood
    return (coord / sourceImageHeight) * container.clientHeight;
  });
  return normalizedCoords;
}
