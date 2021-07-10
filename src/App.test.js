import { render, screen } from "@testing-library/react";
import App from "./app";

test("should render the home page by default", () => {
  render(<App />);

  const appElement = screen.getByTestId("home-page");

  expect(appElement).toBeInTheDocument();
});
