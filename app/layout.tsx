import "./globals.css";
import TopButtons from "./components/TopButtons";

export const metadata = {
  title: "Breeze Family",
  description: "Entertainment • Media • Merch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="bg-black text-white">

        {/* GLOBAL NAVIGATION */}
        <TopButtons />

        {/* PAGE CONTENT */}
        {children}

      </body>

    </html>
  );
}