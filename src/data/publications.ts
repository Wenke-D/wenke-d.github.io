export type Publication = {
  title: string;
  authors: string;        // use **Your Name** to bold yourself
  venue: string;          // e.g. "NeurIPS 2025"
  year: number;
  links?: { label: string; href: string }[];
  selected?: boolean;     // show on the homepage "Selected" list
};

// Newest first. Add a new entry at the top when you publish.
export const publications: Publication[] = [
  {
    title: "Nix to the Rescue for a Reproducible HPC-AI Software Stack",
    authors: "**Wenke Du**, Jean-Marc Gratien, Raphaël Gayno, Bruno Raffin",
    venue: "1st REPRO-HPC Workshop (co-located with ISC26)",
    year: 2026,
    selected: true,
    links: [{ label: "Workshop", href: "https://repro-hpc.github.io/" }],
  },
];
