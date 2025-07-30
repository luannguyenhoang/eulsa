"server only";

import { Home } from "@/components/home";
import { fetchSeo } from "@/utils/seo";
import { replaceSeoRM } from "@/utils/seoRankMath";
import ReactHtmlParser from "html-react-parser";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const api_rm_url = process.env.API_RMS_URL || "";
  const api_url = `${api_rm_url}`;
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "";

  try {
    const res = await fetchSeo({ url: api_url, revalidate: 3600 });
    if (!res.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const head = await res.json();
    const resForm = await fetch(`${domain}/api/gen-form/?type=form-main`);
    if (!resForm.ok) {
      throw new Error(`Posts fetch failed with status: ${res.statusText}`);
    }
    const form = await resForm.json();
    return {
      props: {
        head: head?.head || null,
        form: form
      }
    };
  } catch (error) {
    return {
      props: {
        head: null,
        form: null
      }
    };
  }
};

export default function Page(props: any) {
  const { head } = props;

  // Function to extract title from meta
  const getTitleFromMeta = (head: string) => {
    const match = head.match(/<meta\s+property="og:title"\s+content="([^"]*)"/);
    return match ? match[1] : null;
  };

  // State to hold the content of og:title meta tag
  const [ogTitleContent, setOgTitleContent] = useState<string | null>(null);

  // Update ogTitleContent when head changes
  useEffect(() => {
    if (head) {
      const title = getTitleFromMeta(head);
      setOgTitleContent(title);
    }
  }, [head]);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const key = "form-data-form-main";
    const expires = 1000 * 60 * 60 * 6; // 6 tiếng

    try {
      const cached = localStorage.getItem(key);
      let shouldSet = true;

      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.expires > Date.now()) {
          shouldSet = false;
        }
      }

      if (shouldSet && props.form) {
        localStorage.setItem(
          key,
          JSON.stringify({
            data: props.form,
            expires: Date.now() + expires
          })
        );
      }
    } catch (err) {
      console.error("Failed to set form data in localStorage:", err);
    }
  }, [props.form]);
  return (
    <>
      {head && (
        <Head>
          {ReactHtmlParser(replaceSeoRM(head))}
          <title>{ogTitleContent}</title>
        </Head>
      )}
      <Home />
    </>
  );
}
