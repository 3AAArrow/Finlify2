import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finlify - Financial Education",
  description: "Learn financial concepts through interactive quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-indigo-100 to-purple-100 min-h-screen`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Chatbot />
      </body>
    </html>
  );
}
