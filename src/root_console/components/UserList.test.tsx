import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserList from "./UserList";
import { User } from "../../types";
import { renderWithAllWrappers } from "../../shared/testUtils";
import userEvent from "@testing-library/user-event";

vi.mock("../../services/index", () => ({
  deleteAccount: vi.fn(),
}));

const mockUsers: User[] = [
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

describe("UserList component", () => {
  it("renders the user list with correct user data", () => {
    renderWithAllWrappers(<UserList users={mockUsers} setUsers={vi.fn()} />);

    const userRows = screen.getAllByRole("row");
    expect(userRows).toHaveLength(mockUsers.length + 1);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument();
  });

  it("renders a delete button for each user", () => {
    renderWithAllWrappers(<UserList users={mockUsers} setUsers={vi.fn()} />);

    const deleteButtons = screen.getAllByRole("button", {
      name: /delete user/i,
    });
    expect(deleteButtons).toHaveLength(mockUsers.length);
  });

  it("opens the delete confirmation modal when the delete button is clicked", async () => {
    renderWithAllWrappers(<UserList users={mockUsers} setUsers={vi.fn()} />);

    const deleteButton = screen.getAllByRole("button", {
      name: /delete user/i,
    })[0];
    await userEvent.click(deleteButton);

    const modalHeader = screen.getByText("Confirm Deletion");
    expect(modalHeader).toBeInTheDocument();

    expect(
      screen.getByText("Are you sure you want to delete John Doe?")
    ).toBeInTheDocument();
  });
});
