import { CardBlog } from "@/components/CardBlog";
import Link from "next/link";
import { useEffect, useState } from "react";
import AnimatedText from "../AnimatedText";
import { clean } from "../lib/sanitizeHtml";
import { formatDate } from "@/utils/date";

export const LatestNews = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postResponse = await fetch(`/api/posts?page=1`);
        if (!postResponse.ok) {
          throw new Error(`Failed to fetch posts: ${postResponse.statusText}`);
        }
        const data = await postResponse.json();
        console.log(data);
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <div className="text-4xl text-blue-900 font-bold my-6 uppercase text-center">
        Tin tức - thông báo
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <CardBlog
            key={index}
            title={clean(post?.title) || ""}
            image={post?.featured_image  || "/assets/blog.jpeg"}
            tag={post?.category}
            path={`/${post?.slug}`}
            date={post?.date ? formatDate(post.date) : ""}
            desc={clean(post.excerpt) || ""}
            category={post?.category}
          />
        ))}
      </div>
    </div>
  );
};
