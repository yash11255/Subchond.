import type {Metadata} from "next";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import {getSanityBlogPosts} from "@/lib/sanity";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Subchond Blog | Joint Preservation & Knee Health",
  description: "Clinical education from Subchond on knee health, joint preservation, imaging and recovery.",
};

export default async function BlogPage() {
  const posts = await getSanityBlogPosts();
  return (
    <main className="min-h-screen bg-[#F7FAF9] text-[#1B2B2A]">
      <section className="border-b border-[#0F766E]/15 bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] px-6 pb-16 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-sans-clean text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">Subchond journal</p>
          <h1 className="font-serif-display mt-4 max-w-3xl text-5xl font-bold leading-tight md:text-7xl">Clearer answers for healthier knees.</h1>
          <p className="font-sans-clean mt-6 max-w-2xl text-base leading-relaxed text-[#4B5F5D] md:text-lg">
            Clinical education on joint preservation, MRI findings, treatment options and the road back to movement. New articles are being prepared for the Subchond journal.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/conditions" className="rounded-full bg-[#0F766E] px-6 py-3 font-sans-clean text-sm font-bold text-white transition hover:bg-[#115E59]">Explore conditions</Link>
            <Link href="/treatments" className="rounded-full border border-[#0F766E]/25 bg-white px-6 py-3 font-sans-clean text-sm font-bold text-[#0F766E] transition hover:bg-[#E8F1EF]">View treatments</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-6 py-14 md:px-12 md:py-20">
        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-[#0F766E]/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                {post.coverImage?.url ? <div className="relative aspect-[16/9] bg-[#E8F1EF]"><Image src={post.coverImage.url} alt={post.coverImage.alt || post.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 50vw" /></div> : <div className="aspect-[16/9] bg-gradient-to-br from-[#0F766E] to-[#164E63]" />}
                <div className="p-6">
                  <p className="font-sans-clean text-xs font-bold uppercase tracking-[0.16em] text-[#C2410C]">{post.author || "Dr. Manu Bora"}{post.readingTime ? ` · ${post.readingTime} min read` : ""}</p>
                  <h2 className="font-serif-display mt-2 text-2xl font-bold text-[#1B2B2A] group-hover:text-[#0F766E]">{post.title}</h2>
                  {post.excerpt && <p className="font-sans-clean mt-3 text-sm leading-relaxed text-[#4B5F5D]">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#0F766E]/15 bg-white p-8 shadow-sm md:p-12">
            <p className="font-sans-clean text-xs font-bold uppercase tracking-[0.2em] text-[#C2410C]">Coming soon</p>
            <h2 className="font-serif-display mt-3 text-3xl font-bold text-[#0F766E]">The first Dr. Manu Bora articles are on their way.</h2>
            <p className="font-sans-clean mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4B5F5D]">Publish your first blog post in the Dr. Manu Bora Sanity Studio and it will appear here automatically.</p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
