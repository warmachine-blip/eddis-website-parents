import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import SectionHeading from "@/components/section-heading";
import ConditionCard from "@/components/condition-card";
import { TiltCardGroup } from "@/components/tilt-card";
import { conditions } from "@/lib/conditions";

export const metadata: Metadata = {
  title: "Conditions We Treat in Houston",
  description:
    "Start with what hurts: back pain, knee pain, sciatica, neuropathic pain. Each page explains how the cause is found and treated, usually without surgery.",
};

export default function PainCenterPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <section>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Conditions" }]} />
        <SectionHeading
          as="h1"
          eyebrow="Pain Center"
          title="Conditions we treat in Houston & Humble."
          lead="Start with the diagnosis that fits: back pain, knee pain, sciatica, neuropathic pain, and the rest. Dr. Baumgartner works out what is causing each one before treating it, and for most of them the treatment is not an operation."
        />
      </section>

      <section className="mt-12">
        <TiltCardGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...conditions]
            .sort((a, b) => Number(a.deEmphasized ?? false) - Number(b.deEmphasized ?? false))
            .map((condition) => (
              <ConditionCard key={condition.slug} condition={condition} headingLevel="h2" />
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
