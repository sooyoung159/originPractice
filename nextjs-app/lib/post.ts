import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
  // /posts 파일 이름을 잡아주기
  const fileNames = fs.readdirSync(postsDirectory);
  // ['pre-rendering.md, ...]

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });

  // Sorting

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
};