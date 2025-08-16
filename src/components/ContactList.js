import React from "react";
import API from "../api";

export default function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
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
                />
              ) : (
                "No photo"
              )}
            </td>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>
              <button onClick={() => onEdit(contact)}>Edit</button>
              <button onClick={() => onDelete(contact.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
