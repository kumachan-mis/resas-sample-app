test("able to access API key", () => {
  expect(process.env.RESAS_API_KEY).toBeTruthy();
});
