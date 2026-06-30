import "../globals.css";

export const metadata = {
  title: "Project Aurora",
  description: "The next generation of Breeze Family",
};

export default function AuroraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}