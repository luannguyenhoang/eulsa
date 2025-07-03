"server only";

import { TMenus, menus } from "@/router";
import { fetchAuth } from "@/utils/fetchAuth";
import { NextApiResponse } from "next";

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN!;
const API_URL = process.env.API_URL!;
const PER_PAGE = 100;

const getAllPaths = (menus: TMenus): string[] => {
  const paths: string[] = [];
  menus.forEach((menu) => {
    if (menu.path && menu.path !== "#") paths.push(menu.path);
    if (menu.childs) paths.push(...getAllPaths(menu.childs));
  });
  return paths;
};

const generateSiteMap = (slugs: string[]): string => {
  const staticPaths = getAllPaths(menus);
  const staticUrls = staticPaths
    .map((path) => `<url><loc>${DOMAIN}${path}</loc></url>`)
    .join("");

  const postUrls = slugs
    .map((slug) => `<url><loc>${DOMAIN}/${slug}</loc></url>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
</urlset>`;
};

export const getServerSideProps = async ({ res }: { res: NextApiResponse }) => {
  let slugs: string[] = [];
  let page = 1;

  try {
    while (true) {
      const response = await fetchAuth({
        url: `${API_URL}/posts?_fields=slug&per_page=${PER_PAGE}&status=publish&page=${page}`,
        revalidate: 3600
      });

      const data = await response.json();
      const totalPages = Number(response.headers.get("X-WP-TotalPages") || 0);

      slugs.push(...data.map((item: any) => item.slug));
      if (page >= totalPages) break;
      page++;
    }
  } catch (err) {
    console.error("❌ Error fetching sitemap:", err);
  }

  const sitemap = generateSiteMap(slugs);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

const SiteMap = () => null;
export default SiteMap;
