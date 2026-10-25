import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell, { CtaBanner } from "@/components/PageShell";
import { RESEARCH_STUDIES } from "@/lib/data";
import { TREATMENTS } from "@/lib/pages";

export const metadata: Metadata = {
  title: "About Dr. Manu Bora | Orthopaedic Surgeon & Joint Preservation Specialist",
  description:
    "Dr. Manu Bora — MS Orthopaedics, Arthrex Master Instructor, specialist in the single Subchond injection, arthroscopy and sports injuries in Gurugram, New Delhi and Mumbai.",
};

const TRAINING = [
  { title: "MBBS, MS Orthopaedics", detail: "Postgraduate surgical training" },
  { title: "Sports Injury Centre, Safdarjung Hospital", detail: "Sports injury and arthroscopy training" },
  { title: "Arthrex Master Instructor", detail: "Teaches arthroscopic and allied surgeries to surgeons" },
];

const CENTRES = ["Gurugram", "New Delhi", "Mumbai"];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About Doctor"
      title="Dr. Manu Bora"
      intro="Orthopaedic surgeon and joint-preservation specialist focused on treating the real source of knee pain — often the bone beneath the cartilage — with a single Subchond injection using the patient's own adipocyte cells."
      crumbs={[{ label: "About", href: "/about" }]}
    >
      <div className="grid gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#F3F4F2] shadow-lg">
            <Image src="/dr-manu-bora.jpg" alt="Dr. Manu Bora" fill priority className="object-cover object-[center_30%]" sizes="380px" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["/images/dr2.png", "/images/dr3.png"].map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-2xl bg-[#F3F4F2]">
                <Image src={src} alt="Dr. Manu Bora in the operating theatre" fill className="object-cover" sizes="190px" />
              </div>
            ))}
          </div>
        </div>

        <div className="font-sans-clean space-y-10">
          <section>
            <h2 className="font-serif-display text-2xl font-bold text-[#0F766E]">Philosophy</h2>
            <p className="mt-3 text-[15px] leading-relaxed">
              Cartilage has no nerves — much of arthritic knee pain comes from stressed subchondral bone. Dr. Bora&apos;s approach
              asks not only &ldquo;how much cartilage is left?&rdquo; but &ldquo;what is driving the pain?&rdquo;, and treats that
              source directly to help patients keep their natural knee for longer.
            </p>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl font-bold text-[#0F766E]">Training & roles</h2>
            <ul className="mt-4 space-y-3">
              {TRAINING.map((t) => (
                <li key={t.title} className="rounded-xl border border-[#0F766E]/15 bg-white p-4">
                  <p className="font-bold">{t.title}</p>
                  <p className="text-sm text-[#4B5F5D]">{t.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl font-bold text-[#0F766E]">Treatments offered</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {TREATMENTS.map((t) => (
                <Link key={t.slug} href={`/treatments/${t.slug}`}
                  className="rounded-full border border-[#0F766E]/25 bg-[#E8F1EF] px-4 py-2 text-sm font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white">
                  {t.title}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl font-bold text-[#0F766E]">Evidence</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {RESEARCH_STUDIES.slice(0, 2).map((s) => (
                <div key={s.id} className="rounded-xl border border-[#0F766E]/15 bg-white p-5">
                  <p className="text-4xl font-bold text-[#C2410C]">{s.percentage}%</p>
                  <p className="mt-1 text-sm font-semibold">{s.outcomeText}</p>
                  <p className="mt-1 text-xs text-[#4B5F5D]">{s.population}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif-display text-2xl font-bold text-[#0F766E]">Clinical centres</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {CENTRES.map((c) => (
                <div key={c} className="rounded-xl bg-[#0F766E] p-4 text-center font-bold text-white">{c}</div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <CtaBanner />
    </PageShell>
  );
}
