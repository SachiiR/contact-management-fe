import React from "react";
import { User } from "../types/user";

interface UserListProps {
    users: User[];
    onUpdate: (user: User) => void;
    onViewContacts: (user: User) => void;
    onDelete: (userId: string) => void;
  }

export default function UserList({ users, onUpdate, onViewContacts, onDelete}: UserListProps) {
  return (
    <table className="table table-bordered table-hover mt-3">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
           <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onUpdate(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => onViewContacts(user)}
              >
                View Contacts
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </button>
            </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
