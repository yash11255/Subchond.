import type {JsonLdNode} from "@/lib/seo";

export default function JsonLd({nodes}: {nodes: JsonLdNode[]}) {
  const data = {"@context": "https://schema.org", "@graph": nodes};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data).replace(/</g, "\\u003c")}} />;
}
