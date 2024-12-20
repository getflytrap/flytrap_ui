import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CreateUser from "./CreateUser";
import { renderWithAllWrappers } from "../../shared/testUtils";
import userEvent from "@testing-library/user-event";

describe("CreateUser component", () => {
  it("CreateUser component renders correctly", () => {
    renderWithAllWrappers(<CreateUser setUsers={vi.fn()} />);
    const createButton = screen.getByRole("button", {
      name: /create new user/i,
    });
    expect(createButton).toBeInTheDocument();
  });

  it("Modal opens when 'Create New User' is clicked", async () => {
    renderWithAllWrappers(<CreateUser setUsers={vi.fn()} />);
    const createButton = screen.getByRole("button", {
      name: /create new user/i,
    });
    await userEvent.click(createButton);
    const modalHeader = screen.getByText("Create a New User");
    expect(modalHeader).toBeInTheDocument();
  });

  it("First name field text updates when user types into it", async () => {
    renderWithAllWrappers(<CreateUser setUsers={vi.fn()} />);
    const createButton = screen.getByRole("button", {
      name: /create new user/i,
    });
    await userEvent.click(createButton);
    const firstNameInput = screen.getByPlaceholderText("Enter first name");
    const user = userEvent.setup();
    await user.type(firstNameInput, "John");
    expect(firstNameInput).toHaveValue("John");
  });

  it("Last name field text updates when user types into it", async () => {
    renderWithAllWrappers(<CreateUser setUsers={vi.fn()} />);
    const createButton = screen.getByRole("button", {
      name: /create new user/i,
    });
    await userEvent.click(createButton);
    const lastNameInput = screen.getByPlaceholderText("Enter last name");
    const user = userEvent.setup();
    await user.type(lastNameInput, "Doe");
    expect(lastNameInput).toHaveValue("Doe");
  });

  it("Email field text updates when user types into it", async () => {
    renderWithAllWrappers(<CreateUser setUsers={vi.fn()} />);
    const createButton = screen.getByRole("button", {
      name: /create new user/i,
    });
    await userEvent.click(createButton);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const user = userEvent.setup();
    await user.type(emailInput, "john.doe@example.com");
    expect(emailInput).toHaveValue("john.doe@example.com");
  });

  it("Password field text updates when user types into it", async () => {
    renderWithAllWrappers(<CreateUser setUsers={vi.fn()} />);
    const createButton = screen.getByRole("button", {
      name: /create new user/i,
    });
    await userEvent.click(createButton);
    const passwordInput = screen.getByPlaceholderText("Enter password");
    const user = userEvent.setup();
    await user.type(passwordInput, "password123");
    expect(passwordInput).toHaveValue("password123");
  });

  it("Confirm Password field text updates when user types into it", async () => {
    renderWithAllWrappers(<CreateUser setUsers={vi.fn()} />);
    const createButton = screen.getByRole("button", {
      name: /create new user/i,
    });
    await userEvent.click(createButton);
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");
    const user = userEvent.setup();
    await user.type(confirmPasswordInput, "password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });
});
