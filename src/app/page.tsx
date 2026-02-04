import assert from "assert";
import Summary from "@/lib/components/Summary";
import ContactForm from "@/lib/components/ContactForm";

export default function Home() {
  assert(process.env.RECAPTCHA_SITE_KEY);
  return (
    <div className="flex flex-col">
      <Summary />
      <ContactForm siteKey={process.env.RECAPTCHA_SITE_KEY} />
    </div>
  );
}
