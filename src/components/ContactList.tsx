import React, { JSX } from "react";
import API from "../api";
import { ChevronUp, ChevronDown } from "lucide-react";
import { SORT } from "../utils/constants";

export default function ContactList({
  contacts,
  onUpdate,
  handleDeleteClick,
  sortBy,
  order,
  onSort,
}) {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Photo</th>
            <th
              onClick={() => onSort("name")}
              style={{ cursor: "pointer", position: "relative" }}
            >
              Name
              {sortBy === "name" && (
                <span style={{ position: "absolute", right: "8px" }}>
                  {order === SORT.ASC ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              )}
            </th>

            <th
              onClick={() => onSort("email")}
              style={{ cursor: "pointer", position: "relative" }}
            >
              Email
              {sortBy === "email" && (
                <span style={{ position: "absolute", right: "8px" }}>
                  {order === SORT.ASC ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </span>
              )}
            </th>
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
                  onClick={() => handleDeleteClick(contact.id)}
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
