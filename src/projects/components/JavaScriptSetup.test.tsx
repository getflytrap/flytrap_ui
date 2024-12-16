import { screen } from "@testing-library/react";
import { describe, it } from "vitest";
import JavaScriptSetup from "./JavaScriptSetup";
import { renderWithAllWrappers } from "../../shared/testUtils";

describe("JavaScriptSetup component", () => {
  it("JavaScriptSetup component renders properly", () => {
    renderWithAllWrappers(<JavaScriptSetup apiKey="123" />);

    const Heading = screen.getByText("Configure JavaScript SDK");

    expect(Heading).toBeInTheDocument();
  });
});
