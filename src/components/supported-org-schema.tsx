import JsonLd from "@/components/json-ld";
import type { SupportedOrg } from "@/lib/community";
import { ORG_ID, supportedOrgId } from "@/lib/schema";

/**
 * One NGO node per organization the practice supports.
 *
 * `funder` points back at the practice rather than the practice listing the
 * charities: schema.org has no "sponsors" property, only the inverse, so the
 * relationship has to be stated from the charity's side to be well-formed.
 */
export default function SupportedOrgSchema({
  org,
  description,
  founder,
}: {
  org: SupportedOrg;
  description: string;
  /** Named founder, where the organization publishes one. */
  founder?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "NGO",
        "@id": supportedOrgId(org.slug),
        name: org.name,
        url: org.website,
        ...(org.sameAs.length > 0 ? { sameAs: org.sameAs } : {}),
        foundingDate: org.foundingDate,
        ...(founder ? { founder: { "@type": "Person", name: founder } } : {}),
        description,
        funder: { "@id": ORG_ID },
      }}
    />
  );
}
