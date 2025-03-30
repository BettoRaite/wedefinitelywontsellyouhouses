export function generateRandomColor(alpha = 1): string {
  // Generate random values for red, green, blue, and alpha
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Return the color in RGBA format
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
