import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}