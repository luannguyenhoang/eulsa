import ErrorBoundary from "@/components/ErrorBoundary";
import { Post } from "@/components/post";
import { fetchAuth } from "@/utils/fetchAuth";
import { fetchSeo } from "@/utils/seo";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import Head from "next/head";
import ReactHtmlParser from "html-react-parser";
import { replaceSeoRM } from "@/utils/seoRankMath";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const api_url = process.env.API_URL || "";
  const url = process.env.API_RMS_URL || "";

  try {
    const params = context.params;
    const slug = params?.slug || "";
    const res = await fetchAuth({
      url: `${api_url}/posts?slug=${slug}`,
      revalidate: 3600
    });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const resSeo = await fetchSeo({
      url: `${url}/${slug}`,
      revalidate: 3600
    });
    const head = await resSeo.json();
    const posts = await res.json();
    const post = posts ? posts[0] : null;

    return {
      props: { post: post || null, head: head.head || null }
    };
  } catch (error) {
    console.log("Error in getserverside props slug.tsx", error);
    return {
      props: { post: null, head: null }
    };
  }
};

interface IPostPage {
  post: any;
  head: string;
}

const Page = (props: IPostPage) => {
  const { post } = props;
  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };
  // Lấy nội dung từ thẻ meta
  const ogTitleContent = props.head ? getTitleFromMeta(props.head) : null;

  return (
    <>
      {props.head && (
        <div>
          <Head>
            {ReactHtmlParser(replaceSeoRM(props.head))}
            <title>{ogTitleContent}</title>
          </Head>
        </div>
      )}
      <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
        <Post post={post} />
      </ErrorBoundary>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return { page };
};

export default Page;
