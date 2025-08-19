import React, { useState, useEffect } from "react";
import API from "../api";
import { Contact } from "../types/contact";
import { COMMON, MESSAGES, REGEX } from "../utils/constants";
import { validateEmail, validateName } from "../utils/validations";
import { showError } from "../utils/toasts";

export default function ContactForm({ onAdd, onUpdate, editingContact }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  let contact: Contact = {
    id: "",
    name: "",
    email: "",
    phone: "",
    createdAt: undefined,
  };

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
      const token = localStorage.getItem(COMMON.TOKEN);
      const res = await API.post("/contacts/upload", formDataUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      photoUrl = res.data.path;
    }

    contact.id = editingContact?.id;
    contact.name = formData.name;
    contact.email = formData.email;
    contact.phone = formData.phone;
    contact.photoUrl = photoUrl;
    if (!validateName(formData.name)) {
      showError(MESSAGES.INVALID_NAME);
    } else if (!validateEmail(formData.email)) {
      showError(MESSAGES.INVALID_EMAIL);
    } else if (!validateName(formData.phone)) {
      showError(MESSAGES.INVALID_PHONE);
    } else {
      if (editingContact) {
        await onUpdate(contact);
      } else {
        await onAdd(contact);
      }

      // reset form after submit
      setFormData({ name: "", email: "", phone: "" });
      setPhoto(null);
      setPreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-12">
        <input
          name="name"
          className="form-control"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <input
          name="email"
          className="form-control"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <input
          name="phone"
          className="form-control"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handlePhotoChange}
        />
      </div>
      {preview && (
        <div className="col-12">
          <img
            src={
              preview.startsWith("blob")
                ? preview
                : `${API.defaults.baseURL}${preview}`
            }
            alt="Preview"
            width="100"
            className="mt-2"
          />
        </div>
      )}
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          {editingContact ? "Update Contact" : "Add Contact"}
        </button>
      </div>
    </form>
  );
}
