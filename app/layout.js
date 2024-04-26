import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";


export const metadata = {
  title: "Satsang Seva",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
