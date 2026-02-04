import { ReactNode } from "react";
import metadata, { title, description } from "@/lib/metadata";
import Header from "@/lib/components/Header";
import "./globals.css";

interface Props {
  children: ReactNode;
}

export { metadata };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <div className="container my-4">
          <Header title={title} description={description} />
          {children}
        </div>
      </body>
    </html>
  );
}
