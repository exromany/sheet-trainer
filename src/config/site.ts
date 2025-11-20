type SiteInfo = {
  name: string;
  title: string;
  description: string;
  url: string;
};

export const siteInfo = {
  name: "Sheet Trainer",
  title: "Sheet Trainer",
  description: "Master sheet music reading with interactive practice exercises",
  url: "https://sheet-trainer.vercel.app/",
} as const satisfies SiteInfo;
