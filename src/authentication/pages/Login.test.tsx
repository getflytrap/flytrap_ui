import { screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Login from "./Login";
import { renderWithAllWrappers } from "../../shared/testUtils";
import userEvent from "@testing-library/user-event";

describe("Login component", () => {
  it("Login component renders correctly", () => {
    renderWithAllWrappers(<Login />);

    const heading = screen.getByText("Login");
    const email = screen.getByText("Email");
    const password = screen.getByText("Password");

    expect(heading).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
  it("Email field text updates when user types into field", async () => {
    renderWithAllWrappers(<Login />);
    const inputEmail = screen.getByRole("textbox", { name: "Email" });
    const user = userEvent.setup();
    await user.type(inputEmail, "email@test.com");
    expect(inputEmail).toHaveValue("email@test.com");
  });
  it("Password field text updates when user types into field", async () => {
    renderWithAllWrappers(<Login />);

    const inputPassword = screen.getByPlaceholderText("Enter your password");

    const user = userEvent.setup();
    await user.type(inputPassword, "password");

    expect(inputPassword).toHaveValue("password");
  });
});
