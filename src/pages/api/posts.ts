// pages/api/posts.ts
import { fetchAuth } from "@/utils/fetchAuth";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  posts: any[];
  totalPosts: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const api_url = process.env.API_URL || "";
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.per_page) || 10;
  const category = req.query.category;

  const excludedSlugs = ["lich-khai-giang", "form-main", "form-poup", "gioi-thieu", "cta"];
  const categoryQuery = category ? `&categories=${category}` : "";

  try {
    const endPoint = `${api_url}/posts?_embed&status=publish&page=${page}&per_page=${per_page}${categoryQuery}`;
    const response = await fetchAuth({ url: endPoint, revalidate: 1 });
    const totalPostsFromAPI = Number(response.headers?.get("X-WP-Total") || "0");

    const postsFromAPI = await response.json();
    const filteredPosts = postsFromAPI.filter((post: any) => !excludedSlugs.includes(post.slug));

    const posts = filteredPosts.map((post:any) => ({
      id: post.id,
      title: post.title.rendered,
      slug: post.slug,
      excerpt: post.excerpt.rendered,
      featured_image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      date: post.date,
      categories: post.categories || [],
    }));

    return res.status(200).json({
      posts,
      totalPosts: String(totalPostsFromAPI),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ posts: [], totalPosts: "0" });
  }
}
