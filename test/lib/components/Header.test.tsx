import { render } from "@testing-library/react";
import Header from "@/lib/components/Header";

it("renders unchanged", () => {
  const { container } = render(<Header title="foo" description="bar" />);
  expect(container).toMatchSnapshot();
});
