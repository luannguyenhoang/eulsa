// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  const api_url = process.env.API_URL || "";

  const page = req.query.page ? Number(req.query.page) : 1;
  const excludedSlugs = [
    "lich-khai-giang",
    "form-main",
    "form-poup",
    "gioi-thieu",
    "cta",
  ];

  let posts: any[] = [];

  let totalPosts = "0";

  try {
    const endPoint = `${api_url}/posts?_embed&per_page=100&status=publish&page=${page}`;
    const response = await fetchAuth({ url: endPoint, revalidate: 1 });
    if (!response.ok) {
      throw new Error(`Posts fetch failed with status: ${response.statusText}`);
    }
    const totalPostsFromAPI = Number(response.headers?.get("X-WP-Total") || "0");
    totalPosts = totalPostsFromAPI > 5 ? String(totalPostsFromAPI - 5) : String(totalPostsFromAPI);

    const postsFromAPI: any[] = await response.json();

    const filteredPosts = postsFromAPI.filter((post) => !excludedSlugs.includes(post.slug));
    posts = filteredPosts.map((post) => {
      const featured_image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
      return {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        excerpt: post.excerpt.rendered,
        featured_image,
        date: post.date,
        categories: post.categories || [],
      };
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      posts: [],
      totalPosts: "0",
    });
  }

  if (req.method === "GET") {
    res.status(200).json({
      posts,
      totalPosts,
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
