import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KisaanMitra AI 🌾 Next-Gen Farm OS",
  description: "खेती होगी स्मार्ट, भविष्य होगा मजबूत। Decentralized multi-agent agricultural cockpit integrating IoT telemetry arrays, YOLOv11 neural pathogen scans, and local RAG databases.",
  keywords: ["Smart Agriculture", "Indian Farmers", "Crop Disease YOLOv11", "LangGraph agents", "PM Kisan", "KisaanMitra"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#050806] text-white">
        {children}
      </body>
    </html>
  );
}
