import Link from "next/link";
import Footer from "./Footer";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: { label: string; href: string }[];
  children: React.ReactNode;
}

/** Shared layout for internal pages: breadcrumb hero + content + footer. */
export default function PageShell({ eyebrow, title, intro, crumbs = [], children }: Props) {
  return (
    <main className="w-full bg-[#F7FAF9] text-[#1B2B2A]">
      <section className="border-b border-[#0F766E]/15 bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <nav className="mb-5 flex flex-wrap gap-2 font-sans-clean text-xs text-[#4B5F5D]">
            <Link href="/" className="hover:text-[#0F766E]">Home</Link>
            {crumbs.map((c) => (
              <span key={c.href} className="flex gap-2">
                / <Link href={c.href} className="hover:text-[#0F766E]">{c.label}</Link>
              </span>
            ))}
          </nav>
          <span className="font-sans-clean text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">{eyebrow}</span>
          <h1 className="font-serif-display mt-3 text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
          {intro && <p className="font-sans-clean mt-4 max-w-2xl text-base leading-relaxed text-[#4B5F5D] md:text-lg">{intro}</p>}
        </div>
      </section>
      <div className="mx-auto max-w-[1100px] px-6 py-12 md:px-12 md:py-16">{children}</div>
      <Footer />
    </main>
  );
}

export function CtaBanner() {
  return (
    <div className="mt-14 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#0F766E] p-8 text-white md:flex-row md:items-center">
      <div>
        <h3 className="font-serif-display text-2xl font-bold">Not sure what your MRI means?</h3>
        <p className="font-sans-clean mt-1 text-sm text-white/80">Get an instant AI explanation, then book a review with Dr. Bora.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/knee-assistant" className="rounded-full bg-white px-5 py-2.5 font-sans-clean text-sm font-bold text-[#0F766E]">Upload MRI</Link>
        <Link href="/#assess" className="rounded-full bg-[#C2410C] px-5 py-2.5 font-sans-clean text-sm font-bold">Book Appointment</Link>
      </div>
    </div>
  );
}
