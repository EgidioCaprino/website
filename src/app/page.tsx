import assert from "assert";
import Summary from "@/lib/components/Summary";
import ContactForm from "@/lib/components/ContactForm";

const siteKey = process.env.RECAPTCHA_SITE_KEY;
assert(siteKey);

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <Summary />
        <ContactForm siteKey={siteKey} />
      </div>
    </>
  );
}
