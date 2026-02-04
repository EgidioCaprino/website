import { render } from "@testing-library/react";
import ContactForm from "@/lib/components/ContactForm";

it("renders unchanged", () => {
  const { container } = render(<ContactForm />);
  expect(container).toMatchSnapshot();
});
