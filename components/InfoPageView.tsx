import Image from "next/image";
import Link from "next/link";
import PageShell, { CtaBanner } from "./PageShell";
import { findPage, hrefFor, type InfoPage } from "@/lib/pages";

export function InfoIndex({ eyebrow, title, intro, base, pages }: {
  eyebrow: string; title: string; intro: string; base: string; pages: InfoPage[];
}) {
  return (
    <PageShell eyebrow={eyebrow} title={title} intro={intro} crumbs={[{ label: eyebrow, href: base }]}>
      <div className="grid gap-6 sm:grid-cols-2">
        {pages.map((p) => (
          <Link key={p.slug} href={`${base}/${p.slug}`}
            className="group overflow-hidden rounded-2xl border border-[#0F766E]/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/9] bg-[#EEF6F4]">
              <Image src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 50vw" />
            </div>
            <div className="p-5 font-sans-clean">
              <h2 className="text-lg font-bold text-[#1B2B2A] group-hover:text-[#0F766E]">{p.title}</h2>
              <p className="mt-1 text-sm text-[#4B5F5D]">{p.tagline}</p>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-[#C2410C]">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
      <CtaBanner />
    </PageShell>
  );
}

export function InfoDetail({ page, eyebrow, base }: { page: InfoPage; eyebrow: string; base: string }) {
  return (
    <PageShell eyebrow={eyebrow} title={page.title} intro={page.tagline}
      crumbs={[{ label: eyebrow, href: base }, { label: page.title, href: `${base}/${page.slug}` }]}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article className="font-sans-clean">
          <p className="text-lg leading-relaxed text-[#1B2B2A]">{page.summary}</p>
          {page.sections.map((s) => (
            <section key={s.heading} className="mt-8">
              <h2 className="font-serif-display text-2xl font-bold text-[#0F766E]">{s.heading}</h2>
              <ul className="mt-3 space-y-2">
                {s.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-[#1B2B2A]">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C2410C]" />{pt}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="mt-10 rounded-xl border border-[#C2410C]/20 bg-[#FFF8EE] p-4 text-xs text-[#4B5F5D]">
            This page is for education only. Suitability for any treatment is decided after a clinical examination and imaging review.
          </p>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#0F766E]/15 bg-[#EEF6F4]">
            <Image src={page.image} alt={page.title} fill className="object-cover" sizes="340px" />
          </div>
          {page.related.length > 0 && (
            <div className="rounded-2xl border border-[#0F766E]/15 bg-white p-5 font-sans-clean">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">Related</h3>
              <ul className="mt-3 space-y-2">
                {page.related.map((slug) => {
                  const r = findPage(slug);
                  return r ? (
                    <li key={slug}><Link href={hrefFor(slug)} className="text-sm font-semibold hover:text-[#0F766E]">{r.title} →</Link></li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </aside>
      </div>
      <CtaBanner />
    </PageShell>
  );
}
