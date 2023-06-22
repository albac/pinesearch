export function getLastPath(url: string) {
  return url.split("/").at(-1) || "/";
}

export function formateDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return `Published ${formattedDate}`;
}
