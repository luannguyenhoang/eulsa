import Image from "next/image";
import Link from "next/link";
import { clean } from "./lib/sanitizeHtml";

export const CardBlog = ({
  title,
  tag,
  image,
  path,
  desc,
  bgTag,
  date,
  preview,
  category
}: {
  title: string;
  tag: string;
  desc: string;
  image?: string;
  path?: string;
  bgTag?: string;
  date?: string;
  preview?: boolean;
  category: string;
}) => {
  return (
    <div className="group bg-white  shadow hover:shadow-lg transition duration-300">
      <Link href={path ?? "#"} className="block">
        <div className="relative">
          <Image
            src={image || `/assets/blog.jpeg`}
            alt={title}
            className="w-full h-[100%] object-cover"
            width={400}
            height={250}
          />
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-bold text-blue-800 mb-4 group-hover:text-[#6366f1]">
            {title}
          </h3>
          <p
            className="text-sm text-[#1657A7] mb-4"
            dangerouslySetInnerHTML={{
              __html: clean(desc)
            }}
          />
          <p className="mt-4 text-gray-600 font-semibold italic">
            Tác giả: Admin - {date}
          </p>
        </div>
      </Link>
    </div>
  );
};

export const CardBlogs = ({
  title,
  tag,
  image,
  path,
  desc,
  bgTag,
  date,
  preview,
  category
}: {
  title: string;
  tag: string;
  desc: string;
  image?: string;
  path?: string;
  bgTag?: string;
  date?: string;
  preview?: boolean;
  category: string;
}) => {
  return (
    <div className="group bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 p-4">
      <Link href={path ?? "#"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="relative w-full md:h-auto">
            <Image
              src={image || `/assets/blog.jpeg`}
              alt={title}
              className="w-full h-[100%] object-cover"
              width={400}
              height={250}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: clean(desc)
              }}
            />
            <p className="mt-4 text-gray-600 font-semibold italic">
              Tác giả: Admin - {date}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const CardRecentPosts = ({
  title,
  image,
  path,
  date
}: {
  title: string;
  image?: string;
  path?: string;
  date?: string;
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link href={path ?? "#"} className="flex items-start gap-4 group">
          <Image
            src={image || `/assets/blog.jpeg`}
            alt={title}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
          <div className="space-y-1">
            <time className="text-sm text-muted-foreground">{date}</time>
            <h3 className="font-medium group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};
