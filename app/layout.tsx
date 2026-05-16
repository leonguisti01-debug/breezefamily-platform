import "./globals.css";
import TopButtons from "./components/TopButtons";

export const metadata = {
  title: "Breeze Family | Entertainment • Talent • Media",

  description:
    "The Breeze Family is a South African entertainment platform featuring talent competitions, fan voting, creators, judges and live media experiences.",

  verification: {
    google:
      "AAagkaK0j7WJuiDmvvXmv-R0x-XOJX6Q3Pwm8mFI6aw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className="bg-black text-white">

        {/* GLOBAL HEADER */}
        <TopButtons />

        {/* PAGE CONTENT */}
        {children}

      </body>

    </html>
  );
}