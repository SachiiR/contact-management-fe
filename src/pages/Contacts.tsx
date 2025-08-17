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
  const role = localStorage.getItem("role");

  // Fetch contacts from API with pagination & search
  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });

      // If your backend returns { data, total } for pagination
      setContacts(res.data.data); // fallback for simple array
      setTotal(res.data.total);
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

  const updateContact = async (updatedData) => {
    await API.put(`/contacts/${updatedData.id}`, updatedData, {
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
<div className="container mt-4">
  <h2 className="text-center">Contacts</h2>

  <ContactForm
    onAdd={addContact}
    onUpdate={updateContact}
    editingContact={editingContact}
  />
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search by name or email"
      value={search}
      onChange={handleSearchChange}
    />
  </div>
  <ContactList
    contacts={contacts || []}
    onUpdate={(c) => setEditingContact(c)} // edit opens in form
    onDelete={deleteContact}
  />

  {/* Pagination Controls */}
  <div className="d-flex justify-content-center align-items-center mt-3">
    <button
      className="btn btn-primary me-2"
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
    >
      Prev
    </button>
    <span className="mx-2">
      Page {page} of {Math.ceil(total / limit) || 1}
    </span>
    <button
      className="btn btn-primary"
      onClick={() => setPage((p) => p + 1)}
      disabled={page >= Math.ceil(total / limit)}
    >
      Next
    </button>
  </div>
</div>
  );
}
