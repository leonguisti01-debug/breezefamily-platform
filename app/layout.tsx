import "./globals.css";
import Navbar from "./components/Navbar";

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
        <Navbar />

        <main className="pt-24 overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}