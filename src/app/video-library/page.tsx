import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb";
import { practice } from "@/lib/nav";
import { libraryVideos, youtubeChannelUrl } from "@/lib/video-library";

export const metadata: Metadata = {
  title: "Video Library",
  description:
    "Physician interviews, patient education, and practice stories from HTx Pain Institute in Houston, straight from our YouTube channel.",
};

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-off-white" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12Z" />
    </svg>
  );
}

export default function VideoLibraryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <Breadcrumb dark items={[{ label: "Home", href: "/" }, { label: "Video Library" }]} />
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Video Library
          </p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white sm:text-5xl">
            See what your care will look like.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-off-white/90">
            Physician interviews, patient education, and practice stories —
            straight from our YouTube channel.
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-pearl">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {libraryVideos.map((video) => (
              <a
                key={video.videoId}
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-off-white transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-navy-deep">
                  <img
                    src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/20 transition-colors group-hover:bg-navy-deep/35">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-off-white/40 bg-off-white/10 backdrop-blur-sm transition-transform group-hover:scale-105">
                      <PlayIcon />
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-deep/85 px-2.5 py-1 text-[10px] font-semibold text-off-white">
                    <YoutubeIcon />
                    Watch on YouTube
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-lg leading-snug text-navy transition-colors group-hover:text-brass-text">
                    {video.title}
                  </h2>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              <YoutubeIcon />
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
            <span className="h-px w-8 bg-current opacity-70" />
            Ready When You Are
          </p>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-serif text-3xl leading-tight text-off-white sm:text-4xl">
            Get the care you deserve. Schedule your consultation today.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-off-white/70">
            Two Houston-area locations. Same-week consults available. Most insurance
            accepted.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request-appointment"
              className="rounded-full border border-brass bg-brass px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-navy-deep hover:bg-brass-light"
            >
              Request Appointment
            </Link>
            <a
              href={practice.phoneHref}
              className="rounded-full border border-off-white/30 px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-off-white hover:border-off-white"
            >
              {practice.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
