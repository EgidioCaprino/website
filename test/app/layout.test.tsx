import { waitFor } from "@testing-library/react";
import RootLayout from "@/app/layout";
import { renderToString } from "react-dom/server";

it("renders unchanged", async () => {
  const html = renderToString(
    <RootLayout>
      <p>foo</p>
    </RootLayout>,
  );
  await waitFor(() => {
    expect(html).toMatchSnapshot();
  });
});
