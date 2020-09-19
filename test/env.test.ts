test("enable to access API key", () => {
  expect(process.env.RESAS_API_KEY).toBeTruthy();
});
