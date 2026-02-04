import { ReactNode } from "react";
import Script from "next/script";
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
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
      <body>
        <div className="container my-4">
          <div className="col-12 col-md-5 mx-auto">
            <div>
              <Header title={title} description={description} />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
