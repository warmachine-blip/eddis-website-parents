import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import ConditionCard from "@/components/condition-card";
import { TiltCardGroup } from "@/components/tilt-card";
import { conditions } from "@/lib/conditions";

export const metadata: Metadata = {
  title: "Pain Center",
  description:
    "From neuropathic pain to chronic back pain, knee pain, and more — find the diagnosis that fits and the right path forward, at HTx Pain Institute in Houston, TX.",
};

export default function PainCenterPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <section>
        <SectionHeading
          as="h1"
          eyebrow="Pain Center"
          title="The conditions we treat — with the expertise they require."
          lead="From neuropathic pain to chronic back pain, knee pain, and more — find the diagnosis that fits and the right path forward."
        />
      </section>

      <section className="mt-12">
        <TiltCardGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition) => (
            <ConditionCard key={condition.slug} condition={condition} />
          ))}
        </TiltCardGroup>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <p className="max-w-xl text-base text-charcoal-soft">
          Already know which procedure you need?
        </p>
        <Link
          href="/services"
          className="mt-4 inline-flex items-center gap-2 border border-navy px-7 py-3.5 font-sans text-sm font-medium text-navy hover:bg-navy hover:text-off-white"
        >
          Browse All Services
        </Link>
      </section>
    </div>
  );
}
