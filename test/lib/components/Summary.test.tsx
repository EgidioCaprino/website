import { render } from "@testing-library/react";
import Summary from "@/lib/components/Summary";

it("renders unchanged", () => {
  const { container } = render(<Summary />);
  expect(container).toMatchSnapshot();
});
