import Summary from "@/lib/components/Summary";
import ContactForm from "@/lib/components/ContactForm";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Summary />
      <ContactForm />
    </div>
  );
}
