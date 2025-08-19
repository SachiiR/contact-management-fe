import React, { useState, useEffect } from "react";
import API from "../api";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmationDialog";
import { COMMON, PAGINATION, SORT } from "../utils/constants";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [limit] = useState(PAGINATION.DEFAULT_LIMIT);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem(COMMON.TOKEN);
  const user = useSelector((state: RootState) => state.users);
  const selectedUserId = user.selectedUser?.id;
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState(COMMON.NAME); // default sort field
  const [order, setOrder] = useState(SORT.ASC); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Fetch contacts from API with pagination & search
  const fetchContacts = async () => {
    try {
      const res = await API.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
        params: { selectedUserId, page, limit, search, sortBy, order },
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
  }, [page, search, sortBy, order]); // refetch when page or search changes

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
  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedId !== null) {
      await deleteContact(selectedId);
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to first page on new search
  };

  return (
    <div className="container mt-4">
      <div className="row align-items-center mb-3">
        <div className="col">
          <h2 className="text-start">Contacts</h2>
        </div>
        <div className="col text-end">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/users")}
          >
            Back
          </button>
        </div>
      </div>
      <ContactForm
        onAdd={addContact}
        onUpdate={updateContact}
        editingContact={editingContact}
      />
      <div className="row mb-3">
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
        handleDeleteClick={handleDeleteClick}
        sortBy={sortBy}
        order={order}
        onSort={(field) => {
          if (sortBy === field) {
            setOrder(order === SORT.ASC ? SORT.DESC : SORT.ASC);
          } else {
            setSortBy(field);
            setOrder(SORT.ASC);
          }
        }}
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
      <ConfirmDialog
        show={showConfirm}
        title="Delete Contact"
        message="Are you sure you want to delete this contact?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
