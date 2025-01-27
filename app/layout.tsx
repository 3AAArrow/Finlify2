import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finlify - Financial Literacy App",
  description: "Learn finance through interactive quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white`}>
        <Navbar />
        {children}
        <Chatbot/>
      </body>
    </html>
  );
}
