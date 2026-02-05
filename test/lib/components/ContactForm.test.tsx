import { render, waitFor } from "@testing-library/react";
import ContactForm, { testId } from "@/lib/components/ContactForm";

it("renders unchanged", async () => {
  const { container, getByTestId } = render(<ContactForm />);
  await waitFor(() => getByTestId(testId.submitButton));
  expect(container).toMatchSnapshot();
});
