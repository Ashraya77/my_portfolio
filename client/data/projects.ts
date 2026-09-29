export type Project = {
  type?: "web" | "app";
  title: string;
  description: string;
  year?: string;
  tags?: string[];
  image?: string;
  images?: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  { title: "PhotoCropper", description: "A passport photo maker for local studios that turns a portrait into a print-ready 3x3 sheet. It streamlines cropping, background removal, and consistent exports.", image: "/photocropper.png" },
  { title: "Solution Computer House", description: "A public website paired with a student management system for Solution Computer House. It combines course information and institute updates with organized student administration." },
  { title: "Ramailo Pokhara", description: "A news portal for Pokhara built to make local stories easy to discover and read. It pairs a fast Next.js reader experience with a Laravel editorial backend.", tags: ["Next.js", "Laravel"], liveUrl: "https://ramailopokhara.com" },
];
