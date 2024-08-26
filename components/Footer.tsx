// app/components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getFooterLinks } from "@utils"; // 引入 getFooterLinks 函数

// 定义 footerLinks 中元素的结构
interface FooterLinkSection {
  title: string;
  links: Array<{ title: string; url: string }>;
}

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState<FooterLinkSection[]>([]);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await getFooterLinks();
        if (res.code === 200 && res.data) {
          // 确保返回的数据结构与预期一致
          const formattedData: FooterLinkSection[] = res.data.map((section: FooterLinkSection) => ({
            title: section.title,
            links: section.links || [], // 确保 links 存在
          }));
          setFooterLinks(formattedData);
        }
      } catch (error) {
        console.error("Error fetching footer links:", error);
      }
    }

    fetchLinks();
  }, []); // 依赖项为空数组，确保只在组件挂载时运行一次

  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6">
          <Image src="/logo.svg" alt="logo" width={118} height={18} className="object-contain" />
          <p className="text-base text-gray-700">
            CarMarket 2024 <br />
            All Rights Reserved &copy;
          </p>
        </div>

        <div className="footer__links">
          {footerLinks.map((item) => (
            <div key={item.title} className="footer__link">
              <h3 className="font-bold">{item.title}</h3>
              <div className="flex flex-col gap-5">
                {item.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    className="text-gray-500"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10">
        <p>@2024 CarMarket. All rights reserved</p>

        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500">
            Privacy & Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
}