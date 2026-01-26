import Link from "next/link";
import { fetchBlogs } from "@/lib/api";
import { Blog, ApiResponse } from "@/types/blogs";

export default async function Home() {
  const response: ApiResponse<{ content: Blog[] }> = await fetchBlogs();
  const blogs = response.data.content;

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      {blogs.length === 0 && (
        <p className="text-gray-500">No blogs yet.</p>
      )}

      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.slug} className="border p-4 rounded">
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>

            <p className="text-sm text-gray-500 mt-1">
              {blog.author} · {new Date(blog.createdAt).toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
