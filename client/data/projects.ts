export type Project = {
  type?: "web" | "app";
  title: string;
  description: string;
  tagline?: string;
  role?: string;
  year?: string;
  tags?: string[];
  features?: string[];
  stack?: string[];
  image?: string;
  images?: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
    { title: "Ramailo Pokhara", description: "A news portal for Pokhara built to make local stories easy to discover and read. It pairs a fast Next.js reader experience with a Laravel editorial backend.", tags: ["Next.js", "Laravel"], liveUrl: "https://ramailopokhara.com", image: "/ramailo-pokhara.png"},
    { title: "Solution Computer House", description: "A public website paired with a student management system for Solution Computer House. It combines course information and institute updates with organized student administration.", tags: ["Next.js", "Laravel"],  liveUrl: "https://solutioncomputerhouse.com.np", image: "/solutioncomputer.png" },
  {
  title: "Suraki",
  type: "app",
  description: "A forest reporting app that lets anyone document illegal or unusual forest activity in seconds. Snap a photo and Suraki automatically attaches the live GPS location, giving authorities an accurate, verifiable report.",
  tags: ["React Native", "Android", "GPS"],
  year: "2026",
  liveUrl: "https://play.google.com/store/apps/details?id=com.ashraya77.nicsurakimob",
  images: ["/suraki1.png", "/suraki2.png"],
},
    { title: "PhotoCropper", description: "A passport photo maker for local studios that turns a portrait into a print-ready 3x3 sheet. It streamlines cropping, background removal, and consistent exports.", image: "/photocropper.png", tags: ["Next.js", "Laravel"],  liveUrl: "https://photocropper.ashraya.com.np", },

  ];
