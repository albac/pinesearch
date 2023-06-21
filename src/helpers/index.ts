import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

export function getLastPath(url: string) {
  return url.split("/").at(-1) || "/";
}

export async function getMdxData(mdxName: string) {
  const INDEX_DIR = "documents";
  const postFilePath = path.join(process.cwd(), `${INDEX_DIR}/${mdxName}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: []
    }
    // scope: data
  });

  // return {mdxSource, data}
  return { mdxSource };
}

export function getMdxItems(): string[] {
  const INDEX_DIR = "documents/";
  const folderPath = path.join(process.cwd(), INDEX_DIR);

  try {
    // Lee los nombres de los archivos en la carpeta
    const fileNames = fs.readdirSync(folderPath);

    // Filtra los archivos para obtener solo los nombres
    const fileNamesOnly = fileNames.map((fileName: any) => path.parse(fileName).name);

    return fileNamesOnly;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function formateDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return `Published ${formattedDate}`;
}
