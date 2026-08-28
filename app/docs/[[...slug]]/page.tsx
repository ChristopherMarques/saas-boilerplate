import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function DocPage({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug?.join("/") || "introduction";
  const filePath = path.join(process.cwd(), "docs", `${slug}.mdx`);
  
  let fileContent;
  let data;
  let content;

  try {
    fileContent = await fs.readFile(filePath, "utf-8");
    const parsed = matter(fileContent);
    data = parsed.data;
    content = parsed.content;
  } catch (err) {
    notFound();
  }

  return (
    <div className="prose prose-invert prose-headings:font-heading prose-p:text-[hsl(0,0%,70%)] prose-a:text-[hsl(351,97%,43.1%)] prose-a:no-underline hover:prose-a:underline max-w-none">
      <h1 className="text-4xl text-[hsl(0,100%,97.3%)] tracking-tighter mb-2">{data.title}</h1>
      {data.description && <p className="text-lg text-[hsl(0,0%,55%)] mb-8">{data.description}</p>}
      <div className="h-px w-full bg-[hsl(0,0%,20%)] mb-8" />
      <MDXRemote source={content} />
    </div>
  );
}
