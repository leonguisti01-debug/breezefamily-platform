import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}