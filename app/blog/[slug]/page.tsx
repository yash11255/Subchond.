import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import {getSanityBlogPost} from "@/lib/sanity";

export const dynamic = "force-dynamic";

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const post = await getSanityBlogPost(slug);
  return post ? {
    title: `${post.seo?.metaTitle || post.title} | Subchond`,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.coverImage?.url ? [{url: post.coverImage.url, alt: post.coverImage.alt || post.title}] : undefined,
    },
  } : {};
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
          {post.coverImage?.url && (
            <div className="mt-10 overflow-hidden rounded-3xl border border-[#0F766E]/10 bg-white shadow-[0_24px_60px_-40px_rgba(27,43,42,0.45)]">
              <Image src={post.coverImage.url} alt={post.coverImage.alt || post.title} width={1440} height={810} unoptimized className="aspect-[16/9] w-full object-cover" priority />
            </div>
          )}
        </div>
      </section>
      <article className="mx-auto max-w-[780px] px-6 py-14 md:px-12 md:py-20">
        <div className="space-y-6 font-sans-clean text-[17px] leading-[1.8] text-[#1B2B2A]">
          {(post.body || []).map((block, index) => {
            if (block._type === "image" && block.url) return (
              <figure key={block._key || index} className="my-10 overflow-hidden rounded-2xl">
                <Image src={block.url} alt={block.alt || "Article illustration"} width={1200} height={675} unoptimized className="h-auto w-full" />
                {block.caption && <figcaption className="mt-2 text-sm text-[#4B5F5D]">{block.caption}</figcaption>}
              </figure>
            );
            if (block._type !== "block") return null;
            const content = (block.children || []).map((child, childIndex) => {
              const mark = block.markDefs?.find((def) => child.marks?.includes(def._key) && def._type === "link");
              const value = child.text || "";
              return mark?.href ? <Link key={child._key || childIndex} href={mark.href} className="font-semibold text-[#0F766E] underline decoration-[#C2410C]/50 underline-offset-4 hover:text-[#C2410C]">{value}</Link> : <span key={child._key || childIndex}>{value}</span>;
            });
            if (block.style === "h2") return <h2 key={block._key || index} className="font-serif-display pt-5 text-3xl font-bold leading-tight text-[#0F766E]">{content}</h2>;
            if (block.style === "h3") return <h3 key={block._key || index} className="font-serif-display pt-3 text-2xl font-bold text-[#1B2B2A]">{content}</h3>;
            if (block.style === "blockquote") return <blockquote key={block._key || index} className="border-l-4 border-[#C2410C] pl-6 italic text-[#4B5F5D]">{content}</blockquote>;
            if (block.listItem === "bullet") return <ul key={block._key || index} className="list-disc pl-6"><li>{content}</li></ul>;
            if (block.listItem === "number") return <ol key={block._key || index} className="list-decimal pl-6"><li>{content}</li></ol>;
            return <p key={block._key || index}>{content}</p>;
          })}
        </div>
        {!post.body?.length && <p className="font-sans-clean text-[#4B5F5D]">This article is being prepared for publication.</p>}
        {post.internalLinks?.length ? (
          <aside className="mt-12 rounded-2xl border border-[#0F766E]/15 bg-[#E8F1EF] p-6">
            <h2 className="font-serif-display text-2xl font-bold text-[#0F766E]">Related reading</h2>
            <ul className="mt-4 space-y-2 font-sans-clean text-sm font-semibold">
              {post.internalLinks.map((link) => <li key={link.href}><Link href={link.href} className="text-[#1B2B2A] hover:text-[#C2410C]">{link.label} <span aria-hidden="true">→</span></Link></li>)}
            </ul>
          </aside>
        ) : null}
        {post.faqs?.length ? (
          <section className="mt-14">
            <h2 className="font-serif-display text-3xl font-bold text-[#0F766E]">Frequently asked questions</h2>
            <div className="mt-6 space-y-5">
              {post.faqs.map((faq) => <div key={faq.question} className="rounded-2xl border border-[#0F766E]/15 bg-white p-5"><h3 className="font-sans-clean text-base font-bold">{faq.question}</h3><p className="mt-2 font-sans-clean text-sm leading-relaxed text-[#4B5F5D]">{faq.answer}</p></div>)}
            </div>
          </section>
        ) : null}
        {post.references?.length ? (
          <section className="mt-14 border-t border-[#0F766E]/15 pt-8">
            <h2 className="font-serif-display text-3xl font-bold text-[#0F766E]">References</h2>
            <ol className="mt-5 space-y-3 font-sans-clean text-sm leading-relaxed text-[#4B5F5D]">
              {post.references.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-[#1B2B2A] underline decoration-[#C2410C]/50 underline-offset-2 hover:text-[#0F766E]">{reference.title}</a>{reference.publisher ? ` — ${reference.publisher}` : ""}</li>)}
            </ol>
          </section>
        ) : null}
      </article>
      <Footer />
    </main>
  );
}
