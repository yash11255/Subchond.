import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7FAF9] text-[#1B2B2A]">
      <section className="relative flex min-h-[72vh] items-center overflow-hidden border-b border-[#0F766E]/15 bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] pt-28 pb-20">
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full border-[42px] border-[#0F766E]/10" />
        <div className="pointer-events-none absolute right-20 top-28 font-serif-display text-[13rem] font-bold leading-none text-[#0F766E]/[0.045] md:text-[19rem]">404</div>
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#C2410C]/5" />
        <div className="relative mx-auto w-full max-w-[1100px] px-6 md:px-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="font-serif-display text-7xl font-bold leading-none text-[#C2410C] md:text-9xl">404</span>
            <span className="h-px w-20 bg-[#C2410C]/50" />
            <span className="font-sans-clean text-xs font-bold uppercase tracking-[0.2em] text-[#4B5F5D]">Off the clinical path</span>
          </div>
          <p className="font-sans-clean text-xs font-bold uppercase tracking-[0.24em] text-[#0F766E]">
            SUBCHOND / PAGE NOT FOUND
          </p>
          <h1 className="font-serif-display mt-5 max-w-3xl text-5xl font-bold leading-[0.98] md:text-7xl">
            Let&apos;s get you back on track.
          </h1>
          <p className="font-sans-clean mt-7 max-w-xl text-base leading-relaxed text-[#4B5F5D] md:text-lg">
            The page you are looking for may have moved, or the address may be incomplete. Start again with the parts of Subchond built to help you understand and preserve your knee.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-[#0F766E] px-6 py-3 font-sans-clean text-sm font-bold text-white transition hover:bg-[#115E59]">
              Back to home
            </Link>
            <Link href="/treatments" className="rounded-full border border-[#0F766E]/25 bg-white px-6 py-3 font-sans-clean text-sm font-bold text-[#0F766E] transition hover:bg-[#E8F1EF]">
              Explore treatments
            </Link>
          </div>
          <div className="mt-14 grid max-w-2xl gap-3 font-sans-clean text-sm sm:grid-cols-3">
            <a href="/conditions" className="rounded-xl border border-[#0F766E]/15 bg-white/70 p-4 font-bold text-[#1B2B2A] transition hover:-translate-y-0.5 hover:border-[#0F766E]/40 hover:text-[#0F766E]">Understand symptoms <span className="text-[#C2410C]">→</span></a>
            <a href="/knee-assistant" className="rounded-xl border border-[#0F766E]/15 bg-white/70 p-4 font-bold text-[#1B2B2A] transition hover:-translate-y-0.5 hover:border-[#0F766E]/40 hover:text-[#0F766E]">Ask the AI assistant <span className="text-[#C2410C]">→</span></a>
            <a href="/blog" className="rounded-xl border border-[#0F766E]/15 bg-white/70 p-4 font-bold text-[#1B2B2A] transition hover:-translate-y-0.5 hover:border-[#0F766E]/40 hover:text-[#0F766E]">Read the journal <span className="text-[#C2410C]">→</span></a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
