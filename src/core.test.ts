/* eslint-disable */

import Core from "./core";
import Config from "./InterfaceConfig";
import path from "path";
import fs from "fs";
import { format } from 'date-fns'

const rootPath = path.resolve("./");

const config: Config = {
  alternateUrls: {
    en: "https://example.en",
    es: "https://example.es",
    ja: "https://example.jp",
    fr: "https://example.fr"
  },
  baseUrl: "https://example.com.ru",
  ignoredPaths: ["admin"],
  pagesDirectory: path.resolve(rootPath , "example" , "pages__test"),
  targetDirectory: path.resolve(rootPath , "example" , "static"),
  ignoreIndexFiles: true,
  ignoredExtensions: ["yml"]
};
const coreMapper = new Core(config);

it("Should detect reserved sites", () => {
  const underscoredSite = coreMapper.isReservedPage("_admin");
  const dotedSite = coreMapper.isReservedPage(".admin");

  expect(underscoredSite).toBe(true);
  expect(dotedSite).toBe(true);
});

it("Should skip non reserved sites", () => {
  const site = coreMapper.isReservedPage("admin");

  expect(site).toBe(false);
});

it("Should ignore expecified site's path ", () => {
  const ignoredPath = coreMapper.isIgnoredPath("admin");

  expect(ignoredPath).toBe(true);
});

it("Should skip non expecified sites's path", () => {
  const ignoredPath = coreMapper.isReservedPage("admin");

  expect(ignoredPath).toBe(false);
});

it("Should ignore expecified extensions", () => {
  const ignoredExtension = coreMapper.isIgnoredExtension("yml");

  expect(ignoredExtension).toBe(true);
});

it("Should skip non expecified extensions", () => {
  const ignoredExtension = coreMapper.isReservedPage("jsx");

  expect(ignoredExtension).toBe(false);
});

it("Should merge path", () => {
  const mergedPath = coreMapper.mergePath("/admin", "list");

  expect(mergedPath).toEqual("/admin/list");
});

it("Should merge path from empty base path", () => {
  const mergedPath = coreMapper.mergePath("", "list");

  expect(mergedPath).toEqual("/list");
});

it("Should merge path from ignored path", () => {
  const mergedPath = coreMapper.mergePath("/admin", "");

  expect(mergedPath).toEqual("/admin");
});

it("Should merge empty path", () => {
  const mergedPath = coreMapper.mergePath("", "");

  expect(mergedPath).toEqual("");
});

it("Should generate sitemap.xml", async () => {
  coreMapper.preLaunch();
  await coreMapper.sitemapMapper(config.pagesDirectory);
  coreMapper.finish();
  const sitemap = fs.statSync(
    path.resolve(config.targetDirectory, "./sitemap.xml")
  );

  expect(sitemap.size).toBeGreaterThan(0);
});

it("Should generate valid sitemap.xml", async () => {
  coreMapper.preLaunch();
  await coreMapper.sitemapMapper(config.pagesDirectory);
  coreMapper.finish();
  const date = format(new Date(), 'yyyy-MM-dd')
  const sitemap = fs.readFileSync(
    path.resolve(config.targetDirectory, "./sitemap.xml"),
    { encoding: "UTF-8" }
  );

  expect(sitemap).toMatchInlineSnapshot(`
    "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
    <urlset xsi:schemaLocation=\\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns=\\"http://www.sitemaps.org/schemas/sitemap/0.9\\" xmlns:xhtml=\\"http://www.w3.org/1999/xhtml\\">
    <url><loc>https://example.com.ru/index.old</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/index.old\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/index.old\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/index.old\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/index.old\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/login</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/login\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/login\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/login\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/login\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/product-discount</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/product-discount\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/product-discount\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/product-discount\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/product-discount\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/set-user</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/set-user\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/set-user\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/set-user\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/set-user\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/store/page1</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/store/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/store/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/store/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/store/page1\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/store/page2</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/store/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/store/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/store/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/store/page2\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/store/product/page1</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/store/product/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/store/product/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/store/product/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/store/product/page1\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/store/product/page2</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/store/product/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/store/product/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/store/product/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/store/product/page2\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/user/page1</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/user/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/user/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/user/page1\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/user/page1\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url><url><loc>https://example.com.ru/user/page2</loc>
                    <xhtml:link rel=\\"alternate\\" hreflang=\\"en\\" href=\\"https://example.en/user/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"es\\" href=\\"https://example.es/user/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"ja\\" href=\\"https://example.jp/user/page2\\" /><xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://example.fr/user/page2\\" />
                    
                    
                    <lastmod>${date}</lastmod>
                    </url></urlset>"
  `);
});

it("Should make map of sites", () => {
  const result = coreMapper.buildPathMap(config.pagesDirectory);

  expect(result).toMatchInlineSnapshot(`
    Object {
      "": Object {
        "page": "",
      },
      "/index.old": Object {
        "page": "/index.old",
      },
      "/login": Object {
        "page": "/login",
      },
      "/product-discount": Object {
        "page": "/product-discount",
      },
      "/set-user": Object {
        "page": "/set-user",
      },
      "/store/page1": Object {
        "page": "/store/page1",
      },
      "/store/page2": Object {
        "page": "/store/page2",
      },
      "/store/product/page1": Object {
        "page": "/store/product/page1",
      },
      "/store/product/page2": Object {
        "page": "/store/product/page2",
      },
      "/user/page1": Object {
        "page": "/user/page1",
      },
      "/user/page2": Object {
        "page": "/user/page2",
      },
    }
  `);
});
