import "./globals.css";
import Navbar from "./components/Navbar";
import FindKai from "./components/FindKai";

export const metadata = {
  title: "Breeze Family",
  description: "A New Breeze Era",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="bg-black text-white overflow-x-hidden">

        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="pt-24 overflow-x-hidden">
          {children}
          <FindKai />
        </main>

      </body>

    </html>
  );
}