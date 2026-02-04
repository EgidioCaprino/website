import metadata from "@/lib/metadata";

it("should provide the correct title", () => {
  expect(metadata.title).toBe("Egidio Caprino");
});

it("should provide the correct description", () => {
  expect(metadata.description).toBe(
    "Software Engineer in Hengelo, Netherlands",
  );
});
