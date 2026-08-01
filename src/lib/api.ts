const BASE_URL = "http://localhost:8081";

export async function fetchBlogs(page = 0) {
  const res = await fetch(`${BASE_URL}/api/blogs?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export async function fetchBlogBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/blogs/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Blog not found");
  }

  return res.json();
}

export async function fetchResume() {
  const res = await fetch(`${BASE_URL}/api/resume`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch resume");
  }

  return res.json();
}
