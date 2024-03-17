export function isValidDate(dateString: string) {
  const date = new Date(dateString);
  // Check if date is invalid
  // @ts-expect-error
  if (isNaN(date)) {
    return false;
  }

  // Additional check for formats that are parsed as valid by the Date constructor,
  // but do not correspond to real dates (e.g., February 30)
  return date.toISOString().slice(0, 10) === dateString;
}
