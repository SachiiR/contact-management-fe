import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import { User } from "../types/user";
import { Contact } from "../types/contact";
import { setAllUsers, setSelectedUser } from "../store/slice/user/user.slice";
import { useDispatch } from "react-redux";
import UserForm from "../components/UserForm";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userContacts, setUserContacts] = useState<Contact[]>([]);
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      setUsers(res.data.data);
      dispatch(setAllUsers(res.data.data));
    } catch (err) {
      console.error(err);
      navigate("/"); // redirect if not admin or unauthorized
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [token, navigate]);

  // Edit user handler
  const updateUser = async (updatedData: User) => {
    await API.put(`/users/${updatedData.id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditingUser(null);
    fetchUsers(); // refresh users list
  };

  // Delete user handler
  const deleteUser = async (userId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user and all their contacts?"
      )
    ) {
      await API.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // refresh users list
    }
  };

  // View user contacts
  const viewUserContacts = async (user: User) => {
    dispatch(setSelectedUser(user));

    navigate("/contacts");
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="container mt-4">
      <h2>All Users (Admin Only)</h2>
      <UserList
        users={users}
        onUpdate={(c) => setEditingUser(c)} // edit opens in form
        onDelete={deleteUser}
        onViewContacts={(user: User) => viewUserContacts(user)}
      />
      <div></div>
      {editingUser ? (
        <UserForm onUpdate={updateUser} editingUser={editingUser} />
      ) : null}
    </div>
  );
}
