/**
 * Site footer shell. Spanish pages translate the footer in SiteFooter, so this
 * frame does not force lang="en".
 */
export default function FooterFrame({ children }: { children: React.ReactNode }) {
  return <footer className="bg-navy-deep text-off-white/85">{children}</footer>;
}
