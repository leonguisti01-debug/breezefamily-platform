import "./globals.css";

export const metadata = {
  title: "TikTok Stars",
  description: "Kids Talent Search",
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