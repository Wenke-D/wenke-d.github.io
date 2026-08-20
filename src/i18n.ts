// Which languages the site is built in. All the text itself lives in
// src/content/ — see src/content.config.ts for the shape of each file.
export const languages = ["en", "zh"] as const;

export type Lang = (typeof languages)[number];
