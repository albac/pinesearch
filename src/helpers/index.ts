export function getLastPath(url: string) {
  return url.split("/").at(-1) || "/";
}

export function formateDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return `Published ${formattedDate}`;
}

export const uniqueArray = (array: any[]) => {
  return Array.from(new Set(array));
};

export const arrayContains = (array: any[], value: any) => {
  const unique = new Set(array);
  return unique.has(value);
};
