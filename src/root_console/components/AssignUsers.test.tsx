import { screen } from "@testing-library/react";
import { describe, it } from "vitest";
import AssignUsers from "./AssignUsers";
import { renderWithAllWrappers } from "../../shared/testUtils";

const mockUsers = [
  {
    uuid: "1",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    is_root: false,
  },
  {
    uuid: "2",
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    is_root: false,
  },
];

describe("AssignUsers component", () => {
  it("AssignUsers component renders correctly", () => {
    renderWithAllWrappers(<AssignUsers users={mockUsers} />);

    const button = screen.getByRole("button", {
      name: "Assign User to Project",
    });

    expect(button).toBeInTheDocument();
  });
});
