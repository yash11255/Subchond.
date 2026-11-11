import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import BlogPortableText from "@/components/BlogPortableText";
import {getSanityBlogPost} from "@/lib/sanity";
import JsonLd from "@/components/JsonLd";
import {absoluteUrl, breadcrumb, DOCTOR_ID, ORGANIZATION_ID, pageMetadata, webPage} from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = {params: Promise<{slug: string}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const post = await getSanityBlogPost(slug);
  if (!post) return {};
  const path = `/blog/${slug}`;
  const title = `${post.seo?.metaTitle || post.title} | Subchond`;
  const description = post.seo?.metaDescription || post.excerpt || post.title;
  const image = post.seo?.ogImage || post.coverImage?.url || "/subchond_logo.png";
  const base = pageMetadata({path, title, description, image});
  return {
    ...base,
    robots: post.seo?.noIndex ? {index: false, follow: true} : undefined,
    openGraph: {...base.openGraph, type: "article", publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [post.author || "Dr. Manu Bora"]},
  };
}

export default async function BlogPostPage({params}: Props) {
  const {slug} = await params;
  const post = await getSanityBlogPost(slug);
  if (!post) notFound();
  const path = `/blog/${slug}`;
  const url = absoluteUrl(path);
  const description = post.seo?.metaDescription || post.excerpt || post.title;
  const author = post.author || "Dr. Manu Bora";
  const articleId = `${url}#article`;
  const publishedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-IN", {day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata"}).format(new Date(post.publishedAt))
    : null;

  return (
    <main className="min-h-screen bg-[#F7FAF9] text-[#1B2B2A]">
      <JsonLd nodes={[
        {...webPage(path, post.title, description, "MedicalWebPage"), mainEntity: {"@id": articleId}},
        {
          "@type": "BlogPosting",
          "@id": articleId,
          headline: post.title,
          description,
          url,
          mainEntityOfPage: {"@id": `${url}#webpage`},
          inLanguage: "en-IN",
          isAccessibleForFree: true,
          isPartOf: {"@id": `${absoluteUrl("/blog")}#blog`},
          author: author === "Dr. Manu Bora" ? {"@id": DOCTOR_ID} : {"@type": "Person", name: author},
          publisher: {"@id": ORGANIZATION_ID},
          ...(post.publishedAt ? {datePublished: post.publishedAt} : {}),
          ...(post.updatedAt ? {dateModified: post.updatedAt} : {}),
          ...(post.readingTime ? {timeRequired: `PT${post.readingTime}M`} : {}),
          ...(post.coverImage?.url ? {image: {"@type": "ImageObject", url: post.coverImage.url, caption: post.coverImage.alt || post.title}} : {}),
          ...(post.references?.length ? {citation: post.references.filter((reference) => reference.url).map((reference) => reference.url)} : {}),
        },
        ...(post.faqs?.length ? [{"@type": "FAQPage", "@id": `${url}#faq`, url, isPartOf: {"@id": `${url}#webpage`}, mainEntity: post.faqs.map((faq) => ({"@type": "Question", name: faq.question, acceptedAnswer: {"@type": "Answer", text: faq.answer}}))}] : []),
        breadcrumb(path, [{name: "Home", path: "/"}, {name: "Blog", path: "/blog"}, {name: post.title, path}]),
      ]} />
      <section className="border-b border-[#0F766E]/15 bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] px-6 pb-12 pt-32 md:px-10 md:pb-16 md:pt-40 lg:px-12">
        <div className="mx-auto max-w-[1120px]">
          <Link href="/blog" className="font-sans-clean text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E] hover:text-[#C2410C]">← Subchond journal</Link>
          <div className="font-sans-clean mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B5F5D] sm:gap-x-4">
            <span>
              By {author === "Dr. Manu Bora" ? <Link href="/about" rel="author" className="text-[#0F766E] hover:text-[#C2410C]">{author}</Link> : <span className="text-[#0F766E]">{author}</span>}
            </span>
            {publishedDate && <><span aria-hidden="true" className="text-[#C2410C]">·</span><time dateTime={post.publishedAt}>{publishedDate}</time></>}
            {post.readingTime ? <><span aria-hidden="true" className="text-[#C2410C]">·</span><span>{post.readingTime} min read</span></> : null}
          </div>
          <h1 className="font-serif-display mt-3 max-w-[1050px] text-[clamp(2.6rem,5.4vw,5.2rem)] font-bold leading-[1.08] tracking-tight">{post.title}</h1>
          {post.excerpt && <p className="font-sans-clean mt-6 max-w-[900px] text-base leading-relaxed text-[#4B5F5D] md:text-xl">{post.excerpt}</p>}
          {post.coverImage?.url && (
            <div className="mt-10 overflow-hidden rounded-3xl border border-[#0F766E]/10 bg-white shadow-[0_24px_60px_-40px_rgba(27,43,42,0.45)]">
              <Image src={post.coverImage.url} alt={post.coverImage.alt || post.title} width={1440} height={810} unoptimized className="aspect-[16/9] w-full object-cover" priority sizes="(max-width: 1200px) 100vw, 1120px" />
            </div>
          )}
        </div>
      </section>
      <article className="px-6 py-14 md:px-10 md:py-20 lg:px-12">
        <div className="mx-auto max-w-[1120px]">
        <div className="max-w-[900px]">
          {post.body?.length ? <BlogPortableText value={post.body} /> : null}
        {!post.body?.length && <p className="font-sans-clean text-[#4B5F5D]">This article is being prepared for publication.</p>}
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
        </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
