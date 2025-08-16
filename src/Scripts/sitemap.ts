// scripts/generate-sitemap.ts
import { baseUrl } from "@/System/function";
import fs from "fs";
import moment from "moment";
import path from "path";


const staticRoutes = [
    "",
    "about",
    "login",
    "register",
    "forgot-password",
    "terms-conditions",
    "refund-policy",
    "privacy-policy",

];

const staticXml = staticRoutes
    .map(
        (path) => `
  <url>
    <loc>${baseUrl(path)}</loc>
      <lastmod>${moment().utc().format("YYYY-MM-DDTHH:mm:ssZ")}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>1.0</priority>
  </url>`,
    )
    .join("\n");
export const generateSitemap = async () => {

    const fullSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml.trim()}
</urlset>`;

    fs.writeFileSync(path.resolve("public", "sitemap.xml"), fullSitemap.trim());
    console.log("✅ Sitemap generated!");
};

const generateRobotsTxt = () => {
    const content = `
User-agent: *
Disallow: /private/
Disallow: /agent/
Allow: /

Sitemap: ${baseUrl("/sitemap.xml")}
`.trim();

    fs.writeFileSync(path.resolve("public", "robots.txt"), content);
    console.log("✅ robots.txt generated!");
};

generateRobotsTxt();

generateSitemap();
