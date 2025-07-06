export const cleanInput = (inputStr: string): string[] => {
  // Split user Input into words array
  // lowercase the input and trim leading or trailing whitespaces
  return inputStr
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
};
