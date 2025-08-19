import { useState, useEffect } from "react";
import { User } from "../types/user";

export default function UserForm({ onUpdate, editingUser }) {
  const [formData, setFormData] = useState({ name: "", email: "",  });
  let user : User = {
    id: "",
    name: "",
    email: "",
  }

  // Prefill form when editing, reset when adding new
  useEffect(() => {
   
      setFormData({
        name: editingUser?.name || "",
        email: editingUser?.email || "",
      
      });
   
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    user.id = editingUser.id;
    user.name = formData.name;
    user.email = formData.email;

  
      await onUpdate(user);
   

    // reset form after submit
    setFormData({ name: "", email: ""});
    editingUser = null;
  };

  return (
<form onSubmit={handleSubmit} className="row g-3 mb-4">
<h4>Edit User</h4>
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
    <button type="submit" className="btn btn-primary">
      { "Update Contact"}
    </button>
  </div>
</form>
  );
}
