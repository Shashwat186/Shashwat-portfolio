import { fetchBlogBySlug } from "@/lib/api";
import { Blog, ApiResponse } from "@/types/blogs";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  let blog: Blog;

  try {
    const response: ApiResponse<Blog> = await fetchBlogBySlug(params.slug);
    blog = response.data;
  } catch {
    notFound();
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        {blog.author} · {new Date(blog.createdAt).toDateString()}
      </p>

      <article className="prose prose-lg max-w-none">
        {blog.content}
      </article>
    </main>
  );
}
