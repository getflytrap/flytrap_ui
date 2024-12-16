import { screen } from "@testing-library/react";
import { describe, it } from "vitest";
import ExpressSetup from "./ExpressSetup";
import { renderWithAllWrappers } from "../../shared/testUtils";

describe("ExpressSetup component", () => {
  it("ExpressSetup component renders properly", () => {
    renderWithAllWrappers(<ExpressSetup apiKey="123" />);

    const Heading = screen.getByText("Configure Express SDK");

    expect(Heading).toBeInTheDocument();
  });
});
