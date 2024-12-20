import { screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Landing from "./LandingPage";
import { renderWithAllWrappers } from "../../shared/testUtils";

describe("Landing component", () => {
  it("Landing component renders correctly", () => {
    renderWithAllWrappers(<Landing />);

    const heading = screen.getByText("Catching Bugs So You Don't Have To");
    const developer = screen.getByText("Rebecca Biancofiore");

    expect(heading).toBeInTheDocument();
    expect(developer).toBeInTheDocument();
  });
});
