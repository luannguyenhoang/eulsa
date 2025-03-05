import { CardBlog, CardBlogs } from "@/components/CardBlog";
import { CategoryNavigation } from "@/components/posts/CategoryNavigation";
import { formatDate } from "@/utils/date";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { clean } from "../lib/sanitizeHtml";
import ReactPaginate from "react-paginate";

export const TinTuc = () => {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 8;

  useEffect(() => {
    setCurrentCategory(searchParams.get("category"));
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchCategories();
    fetchPosts();
  }, []);

  const getCategorySlug = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.slug : null;
  };

  const filteredPosts = currentCategory
    ? posts.filter((post) =>
        post.categories.some(
          (categoryId: number) => getCategorySlug(categoryId) === currentCategory
        )
      )
    : posts;

  const featuredPosts = filteredPosts.slice(0, 1);
  const offset = currentPage * postsPerPage;
  const currentPosts = filteredPosts.slice(offset, offset + postsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <CategoryNavigation categories={categories} />
        <div className="grid lg:grid-cols-1 mb-4">
          <div className="lg:col-span-2 space-y-8">
            {featuredPosts.map((post, index) => (
              <CardBlogs
                key={index}
                title={clean(post?.title) || ""}
                image={post?.featured_image || ""}
                tag={post?.category}
                path={`/${post?.slug}`}
                date={post?.date ? formatDate(post.date) : ""}
                desc={clean(post.excerpt) || ""}
                category={post?.category} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mt-[10px] lg:mt-[40px]">
            {currentPosts.map((post, index) => (
              <CardBlog
                key={index}
                title={clean(post?.title) || ""}
                image={post?.featured_image || "/assets/blog.jpeg"}
                tag={post?.category}
                path={`/${post?.slug}`}
                date={post?.date ? formatDate(post.date) : ""}
                desc={clean(post.excerpt) || ""}
                category={post?.category}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredPosts.length / postsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex space-x-2"
            activeClassName="bg-[#1e56a0] text-white px-3 py-1 rounded"
            pageClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
            previousClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
            nextClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
          />
        </div>
      </div>
    </>
  );
};