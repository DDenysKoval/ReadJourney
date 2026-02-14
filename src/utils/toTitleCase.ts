export const toTitleCase = (text: string) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatAndTrimTitle = (title: string, maxLength: number) => {
  const formatted = toTitleCase(title);
  return formatted.length > maxLength
    ? formatted.slice(0, maxLength) + "..."
    : formatted;
};
