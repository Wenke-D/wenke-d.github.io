// Non-translatable details. Display text (name, role, bio, news) lives in src/i18n.ts.
export const site = {
  email: "wenke.du@inria.fr",
  // Links shown in the header. Add more here (e.g. googleScholar, github, cv)
  // and wire them into the header in src/components/Home.astro.
  links: {
    thesis:
      "https://theses.ifpen.fr/these/conception-dun-framework-dinference-de-dnns-dedie-la-simulation-massivement-parallele-pour",
  },
} as const;
