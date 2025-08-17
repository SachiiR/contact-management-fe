import React from "react";
import API from "../api";

export default function ContactList({ contacts, onUpdate, onDelete }) {
  return (
    <div className="table-responsive mt-4">
    <table className="table table-bordered table-hover align-middle">
      <thead className="table-dark">
        <tr>
          <th scope="col">Photo</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>
              {contact.photoUrl ? (
                <img
                  src={`${API.defaults.baseURL}${contact.photoUrl}`}
                  alt={contact.name}
                  width="50"
                  className="rounded-circle"
                />
              ) : (
                <span className="text-muted">No photo</span>
              )}
            </td>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onUpdate(contact)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(contact.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}
