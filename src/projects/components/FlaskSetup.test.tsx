import { screen } from "@testing-library/react";
import { describe, it } from "vitest";
import FlaskSetup from "./FlaskSetup";
import { renderWithAllWrappers } from "../../shared/testUtils";

describe("FlaskSetup component", () => {
  it("FlaskSetup component renders properly", () => {
    renderWithAllWrappers(<FlaskSetup apiKey="123" />);

    const Heading = screen.getByText("Configure Flask SDK");

    expect(Heading).toBeInTheDocument();
  });
});
