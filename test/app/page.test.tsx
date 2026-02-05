import { render, waitFor } from "@testing-library/react";
import Page from "@/app/page";
import { testId } from "@/lib/components/ContactForm";

it("renders unchanged", async () => {
  const { container, getByTestId } = render(<Page />);
  await waitFor(() => getByTestId(testId.submitButton));
  expect(container).toMatchSnapshot();
});
