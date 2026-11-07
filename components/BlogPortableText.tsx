import Image from "next/image";
import Link from "next/link";
import {PortableText, type PortableTextComponents} from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => <p className="mb-6 font-sans-clean text-[16px] leading-[1.85] text-[#1B2B2A] md:text-[18px]">{children}</p>,
    h2: ({children}) => <h2 className="font-serif-display mb-5 mt-12 text-3xl font-bold leading-tight text-[#0F766E] md:text-4xl">{children}</h2>,
    h3: ({children}) => <h3 className="font-serif-display mb-4 mt-8 text-2xl font-bold leading-tight text-[#1B2B2A] md:text-[28px]">{children}</h3>,
    blockquote: ({children}) => <blockquote className="my-9 border-l-4 border-[#C2410C] bg-[#FAF8F4] px-6 py-4 font-serif-display text-xl italic leading-relaxed text-[#4B5F5D]">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="mb-7 list-disc space-y-2 pl-7 font-sans-clean text-[16px] leading-[1.8] marker:text-[#C2410C] md:text-[18px]">{children}</ul>,
    number: ({children}) => <ol className="mb-7 list-decimal space-y-2 pl-7 font-sans-clean text-[16px] leading-[1.8] marker:font-bold marker:text-[#0F766E] md:text-[18px]">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => {
      const href = String(value?.href || "");
      const className = "font-semibold text-[#0F766E] underline decoration-[#C2410C]/50 underline-offset-4 hover:text-[#C2410C]";
      return href.startsWith("/") ? <Link href={href} className={className}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
    },
    strong: ({children}) => <strong className="font-bold text-[#1B2B2A]">{children}</strong>,
    em: ({children}) => <em>{children}</em>,
  },
  types: {
    image: ({value}) => {
      const image = value as {url?: string; alt?: string; caption?: string};
      if (!image.url) return null;
      return <figure className="my-10 overflow-hidden rounded-2xl bg-[#E8F1EF]">
        <Image src={image.url} alt={image.alt || "Article illustration"} width={1200} height={675} unoptimized className="h-auto w-full" />
        {image.caption && <figcaption className="px-5 py-3 font-sans-clean text-sm text-[#4B5F5D]">{image.caption}</figcaption>}
      </figure>;
    },
  },
};

export default function BlogPortableText({value}: {value: Record<string, unknown>[]}) {
  return <PortableText value={value as unknown as Parameters<typeof PortableText>[0]["value"]} components={components} />;
}
