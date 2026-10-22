import { SITE_URL } from "./site";

export type LibraryVideo = {
  videoId: string;
  title: string;
  /** What the YouTube thumbnail actually shows. */
  alt: string;
  /**
   * ISO date from the YouTube watch page publishDate, read 2026-10-21 on the
   * channel "Dr. Edward Baumgartner | HTxpain Care". Duration is omitted:
   * the watch HTML did not tie a length to this video alone.
   */
  uploadDate: string;
};

export const youtubeChannelUrl = "https://www.youtube.com/@htxpaincare";

export const libraryVideos: LibraryVideo[] = [
  {
    videoId: "Rg8h6wTsoHw",
    title: "Effective Pain Relief Therapies for Athletes | Dr. Edward Baumgartner",
    alt: "A man in navy scrubs stands with his arms crossed in a clinic hallway with glass doors. On-screen text reads Effective Pain Relief Therapies for Athletes.",
    uploadDate: "2024-12-30",
  },
  {
    videoId: "t9mnvOo21F0",
    title: "Long-Lasting Pain Relief Options | HTx Pain Care",
    alt: "A man in navy scrubs smiles in a clinic hallway. On-screen text reads Long-Lasting Pain Relief Options.",
    uploadDate: "2024-12-26",
  },
  {
    videoId: "CU13UtmF5os",
    title: "A Career in Pain Management",
    alt: "A man in navy scrubs sits in a black chair in a clinic hallway. On-screen text reads A Career in Pain Management.",
    uploadDate: "2024-12-23",
  },
  {
    videoId: "G9UXJJICk-w",
    title: "Meet Dr. Edward Baumgartner | Pain Management Specialist Houston",
    alt: "A man in navy scrubs stands in a clinic hallway beside the on-screen title Meet Dr. Edward Baumgartner.",
    uploadDate: "2024-12-19",
  },
  {
    videoId: "gn_ip18Occo",
    title: "Patient Due Diligence: A Collaborative Approach to Recovery",
    alt: "A man in navy scrubs stands with his hands clasped in a clinic hallway. On-screen text reads Patient Due Diligence: A Collaborative Approach to Recovery.",
    uploadDate: "2024-12-12",
  },
  {
    videoId: "3AAr5He0_fw",
    title: "Pain Management Myths: What You Should Know",
    alt: "A man in navy scrubs stands with one hand raised in a clinic hallway. On-screen text reads Pain Management Myths: What You Should Know.",
    uploadDate: "2024-12-09",
  },
  {
    videoId: "UfGFF_2xLas",
    title: "A Holistic Approach to Pain Relief | Dr. Edward Baumgartner",
    alt: "A man in navy scrubs sits in a clinic hallway. On-screen text reads A Holistic Approach to Pain Relief.",
    uploadDate: "2024-12-05",
  },
  {
    videoId: "bwxvcx5iYyE",
    title: "Celebrating Recovery: A Story of Pain Relief and Hope",
    alt: "A man in navy scrubs stands in a clinic hallway. On-screen text reads Celebrating Recovery: A Story of Pain Relief and Hope.",
    uploadDate: "2024-12-02",
  },
];

/** VideoObject graph for the library page. Names match the visible card titles. */
export function libraryVideoGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": libraryVideos.map((video) => ({
      "@type": "VideoObject",
      "@id": `${SITE_URL}/video-library#${video.videoId}`,
      name: video.title,
      description: `${video.title}. A video from the HTx Pain Institute YouTube channel.`,
      thumbnailUrl: [
        `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
        `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
      ],
      uploadDate: video.uploadDate,
      embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
      contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
    })),
  };
}
