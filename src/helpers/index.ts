const getLastPath = (url: string) => {
  return url.split("/").at(-1) || "/";
};

export { getLastPath };
