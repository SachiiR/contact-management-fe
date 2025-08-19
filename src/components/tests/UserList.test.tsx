import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "../UserList";
import { User } from "../../types/user";

describe("UserList Component", () => {
  const users: User[] = [
    { id: "1", name: "User", email: "user@example.com", role: "user" },
    { id: "2", name: "Admin", email: "admin@example.com", role: "admin" },
  ];

  const onUpdate = jest.fn();
  const onDelete = jest.fn();
  const onViewContacts = jest.fn();

  test("renders users correctly", () => {
    render(<UserList users={users} onUpdate={onUpdate} onDelete={onDelete} onViewContacts={onViewContacts} />);

    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getAllByText("Edit")).toHaveLength(2);
    expect(screen.getAllByText("Delete")).toHaveLength(2);
  });

  test("calls onUpdate when Edit is clicked", () => {
    render(<UserList users={users} onUpdate={onUpdate} onDelete={onDelete} onViewContacts={onViewContacts} />);
    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(onUpdate).toHaveBeenCalledWith(users[0]);
  });

  test("calls onDelete when Delete is clicked", () => {
    render(<UserList users={users} onUpdate={onUpdate} onDelete={onDelete} onViewContacts={onViewContacts} />);
    fireEvent.click(screen.getAllByText("Delete")[1]);
    expect(onDelete).toHaveBeenCalledWith(users[1].id);
  });

  test("calls onViewContacts when View Contacts is clicked", () => {
    render(<UserList users={users} onUpdate={onUpdate} onDelete={onDelete} onViewContacts={onViewContacts} />);
    fireEvent.click(screen.getAllByText("View Contacts")[0]);
    expect(onViewContacts).toHaveBeenCalledWith(users[0]);
  });

  test("renders 'No users found' when list is empty", () => {
    render(<UserList users={[]} onUpdate={onUpdate} onDelete={onDelete} onViewContacts={onViewContacts} />);
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});
