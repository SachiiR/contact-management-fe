import React, { useState, useEffect } from "react";
import API from "../api";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  // Fetch contacts from API with pagination & search
  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });

      // If your backend returns { data, total } for pagination
      setContacts(res.data); // fallback for simple array
      setTotal(res.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, search]); // refetch when page or search changes

  const addContact = async (contact) => {
    await API.post("/contacts", contact, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContacts();
  };

  const updateContact = async (id, updatedData) => {
    await API.put(`/contacts/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditingContact(null);
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await API.delete(`/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchContacts();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page on new search
  };

  return (
    <div>
      <h2>Contacts</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px" }}
      />

      <ContactForm
        onAdd={addContact}
        onUpdate={updateContact}
        editingContact={editingContact}
      />

      <ContactList
        contacts={contacts}
        onUpdate={(c) => setEditingContact(c)} // edit opens in form
        onDelete={deleteContact}
      />

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page} of {Math.ceil(total / limit) || 1}</span>
        <button
          onClick={() => setPage((p) => (contacts.length < limit ? p : p + 1))}
          disabled={contacts.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}
