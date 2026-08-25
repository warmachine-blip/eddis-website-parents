import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/section-heading";
import ServiceCard, { ServiceBanner } from "@/components/service-card";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services · HTx Pain Institute",
  description:
    "Image-guided procedures, regenerative therapies, and the full modern pain-medicine toolkit, offered at HTx Pain Institute in Houston, TX.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <section>
        <SectionHeading
          eyebrow="What We Treat"
          title="Modern interventional care, tailored to your pain."
          lead="Image-guided procedures, regenerative therapies, and the full modern pain-medicine toolkit — applied with the precision and judgment every patient deserves."
        />
      </section>

      <section className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((service) => !service.comingSoon)
          .map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
      </section>

      <section>
        {services
          .filter((service) => service.comingSoon)
          .map((service) => (
            <div key={service.slug} className="mt-5">
              <ServiceBanner service={service} />
            </div>
          ))}
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <p className="max-w-xl text-base text-charcoal-soft">
          Not sure which treatment fits what you&rsquo;re feeling? Start from your
          symptoms instead.
        </p>
        <Link
          href="/pain-center"
          className="mt-4 inline-flex items-center gap-2 border border-navy px-7 py-3.5 font-sans text-sm font-medium text-navy hover:bg-navy hover:text-off-white"
        >
          Explore the Pain Center
        </Link>
      </section>
    </div>
  );
}
