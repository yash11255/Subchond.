import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import {getSanityBlogPost} from "@/lib/sanity";

export const dynamic = "force-dynamic";

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const post = await getSanityBlogPost(slug);
  return post ? {title: `${post.title} | Dr. Manu Bora`, description: post.excerpt} : {};
}

export default async function BlogPostPage({params}: Props) {
  const {slug} = await params;
  const post = await getSanityBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#F7FAF9] text-[#1B2B2A]">
      <section className="border-b border-[#0F766E]/15 bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] px-6 pb-14 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[900px]">
          <Link href="/blog" className="font-sans-clean text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] hover:text-[#C2410C]">← Subchond journal</Link>
          <p className="font-sans-clean mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#C2410C]">{post.author || "Dr. Manu Bora"}{post.readingTime ? ` · ${post.readingTime} min read` : ""}</p>
          <h1 className="font-serif-display mt-3 text-5xl font-bold leading-tight md:text-7xl">{post.title}</h1>
          {post.excerpt && <p className="font-sans-clean mt-6 max-w-2xl text-lg leading-relaxed text-[#4B5F5D]">{post.excerpt}</p>}
        </div>
      </section>
      <article className="mx-auto max-w-[780px] px-6 py-14 md:px-12 md:py-20">
        <div className="space-y-6 font-sans-clean text-[17px] leading-[1.8] text-[#1B2B2A]">
          {(post.body || []).map((block, index) => {
            const text = (block.children || []).map((child) => child.text || "").join("");
            return text ? <p key={index}>{text}</p> : null;
          })}
        </div>
        {!post.body?.length && <p className="font-sans-clean text-[#4B5F5D]">This article is being prepared for publication.</p>}
      </article>
      <Footer />
    </main>
  );
}
