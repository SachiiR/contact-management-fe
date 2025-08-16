import React, { useState, useEffect } from "react";
import API from "../api";

export default function ContactForm({ onAdd, onUpdate, editingContact }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  // Prefill form when editing, reset when adding new
  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || "",
        email: editingContact.email || "",
        phone: editingContact.phone || "",
      });
      setPreview(editingContact.photoUrl || null);
      setPhoto(null);
    } else {
      setFormData({ name: "", email: "", phone: "" });
      setPhoto(null);
      setPreview(null);
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = preview; // keep existing photo for edit
    if (photo) {
      const formDataUpload = new FormData();
      formDataUpload.append("photo", photo);
      const token = localStorage.getItem("token");
      const res = await API.post("/contacts/upload", formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      photoUrl = res.data.path;
    }

    const payload = { ...formData, photoUrl };

    if (editingContact) {
      await onUpdate(editingContact.id, payload);
    } else {
      await onAdd(payload);
    }

    // reset form after submit
    setFormData({ name: "", email: "", phone: "" });
    setPhoto(null);
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      {preview && (
        <img
          src={preview.startsWith("blob") ? preview : `${API.defaults.baseURL}${preview}`}
          alt="Preview"
          width="100"
          style={{ display: "block", marginTop: "8px" }}
        />
      )}
      <button type="submit">
        {editingContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}
