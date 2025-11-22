import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "RegEx Helper – Online Regex Tester & Builder",
  description: "A clean and powerful RegEx playground built with Next.js.",
  openGraph: {
    title: "RegEx Helper – Online Regex Tester & Builder",
    description:
      "Test, build, and understand Regular Expressions with an intuitive UI.",
    url: "https://regex-helper-zake.vercel.app",
    siteName: "RegEx Helper",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RegEx Helper – Online RegEx Tester",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RegEx Helper – Online Regex Tester",
    description:
      "Test, build, and understand Regular Expressions with an intuitive UI.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
