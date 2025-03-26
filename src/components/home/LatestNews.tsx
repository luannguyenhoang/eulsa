import { useEffect, useState } from "react";
import { formatDate } from "@/utils/date";
import { CardBlog, CardBlogtb } from "@/components/CardBlog";
import { clean } from "../lib/sanitizeHtml";

const Section = ({
  title,
  posts,
  type,
}: {
  title: string;
  posts: any[];
  type: "blog" | "tb";
}) => (
  <div className="my-10">
    <div className="text-2xl lg:text-3xl text-blue-900 font-bold mb-6 uppercase text-center">
      {title}
    </div>

    <div
      className={
        type === "blog"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          : "flex flex-col gap-6"
      }
    >
      {posts.slice(0, 6).map((post, index) =>
        type === "blog" ? (
          <CardBlog
            key={index}
            title={clean(post?.title) || ""}
            image={post?.featured_image || "/assets/blog.jpeg"}
            tag={"Tin tức "}
            path={`/${post?.slug}`}
            date={post?.date ? formatDate(post.date) : ""}
            desc={""}
            category={post?.category}
          />
        ) : (
          <CardBlogtb
            key={index}
            title={clean(post?.title) || ""}
            image={post?.featured_image || "/assets/blog.jpeg"}
            tag={"Thông báo"}
            path={`/${post?.slug}`}
            date={post?.date ? formatDate(post.date) : ""}
            desc={clean(post.excerpt) || ""}
            bgTag={"#38a169"}
          />
        )
      )}
    </div>
  </div>
);

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
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const news = posts.filter((post) => post?.categories?.includes(2));
  const announcements = posts.filter((post) => post?.categories?.includes(1));

  return (
    <div className="py-[70px] max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 gap-0">
        <div className="lg:col-span-2 mb-[30px]">
          <Section
            title="Tin tức"
            posts={news}
            type="blog" 
          />
        </div>
        <div className="lg:col-span-1">
          <Section
            title="Thông báo"
            posts={announcements}
            type="tb" 
          />
        </div>
      </div>
    </div>
  );
};

