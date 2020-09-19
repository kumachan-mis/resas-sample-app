test("enabl to access API key", () => {
  expect(process.env.RESAS_API_KEY).not.toBeUndefined();
});
