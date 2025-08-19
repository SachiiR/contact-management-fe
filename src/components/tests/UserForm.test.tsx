// src/components/tests/UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "../UserForm";
import { User } from "../../types/user";

describe("UserForm Component", () => {
  const mockUpdate = jest.fn();
  const editingUser: User = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("prefills form with editingUser data", () => {
    render(<UserForm onUpdate={mockUpdate} editingUser={editingUser} />);
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
  });

  test("calls onUpdate with form data on submit", () => {
    render(<UserForm onUpdate={mockUpdate} editingUser={editingUser} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.click(screen.getByText(/Update Contact/i));

    expect(mockUpdate).toHaveBeenCalledWith({
      id: "1",
      name: "Jane Doe",
      email: "jane@example.com",
    });
  });

  test("resets form after submit", async () => {
    const mockUpdate = jest.fn();
    const editingUser = { id: 1, name: "John Doe", email: "john@example.com" };

    render(<UserForm onUpdate={mockUpdate} editingUser={editingUser} />);

    fireEvent.click(screen.getByText(/Update Contact/i));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Name")).toHaveValue("");
      expect(screen.getByPlaceholderText("Email")).toHaveValue("");
    });
  });
});
