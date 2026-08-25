import type { IconName } from "@/components/icon-badge";

export type Service = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  icon: IconName;
  comingSoon?: boolean;
};

export const services: Service[] = [
  {
    slug: "radiofrequency-ablation",
    href: "/radiofrequency-ablation",
    title: "Radiofrequency Ablation",
    summary:
      "Outpatient procedure using precise electrical current to quiet damaged or inflamed nerves.",
    icon: "bolt",
  },
  {
    slug: "injections-blocks-specialist",
    href: "/injections-blocks-specialist",
    title: "Injections & Nerve Blocks",
    summary:
      "Image-guided injections that calm inflamed joints, nerves, and spinal structures.",
    icon: "pulse",
  },
  {
    slug: "kyphoplasty-specialist",
    href: "/kyphoplasty-specialist",
    title: "Kyphoplasty",
    summary:
      "Minimally invasive procedure that stabilizes painful spinal compression fractures.",
    icon: "bone",
  },
  {
    slug: "si-joint-fusions",
    href: "/si-joint-fusions",
    title: "SI Joint Fusions",
    summary:
      "Minimally invasive fusion for sacroiliac dysfunction that hasn't responded to conservative care.",
    icon: "spine",
  },
  {
    slug: "spinal-cord-stimulation-specialist",
    href: "/spinal-cord-stimulation-specialist",
    title: "Spinal Cord Stimulation",
    summary:
      "Implantable system that delivers gentle electrical fields to block pain signals before they reach the brain.",
    icon: "split",
  },
  {
    slug: "intracept-procedure",
    href: "/intracept-procedure",
    title: "Intracept Procedure",
    summary:
      "Targets the basivertebral nerve to address chronic low-back pain at its anatomic source.",
    icon: "sparkles",
  },
  {
    slug: "prp-procedure",
    href: "/prp-procedure",
    title: "PRP (Platelet-Rich Plasma)",
    summary:
      "Non-surgical regenerative therapy using your own platelets to accelerate healing.",
    icon: "droplet",
  },
  {
    slug: "mild-procedure",
    href: "/mild-procedure",
    title: "MILD Procedure",
    summary:
      "Minimally invasive lumbar decompression to relieve neurogenic claudication from spinal stenosis.",
    icon: "shield",
  },
  {
    slug: "minuteman-procedure",
    href: "/minuteman-procedure",
    title: "Minuteman SI Joint Fusion",
    summary:
      "An interspinous-interlaminar implant that stabilizes the SI joint with minimal disruption.",
    icon: "spine",
  },
  {
    slug: "peptides",
    href: "/peptides",
    title: "Wellness & Peptides",
    summary:
      "Physician-supervised peptide therapies and weight-loss programs — a dedicated wellness page is coming soon.",
    icon: "sparkles",
    comingSoon: true,
  },
];
