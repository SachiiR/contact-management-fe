import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import { User } from "../types/user";
import { setAllUsers, setSelectedUser } from "../store/slice/user/user.slice";
import { useDispatch } from "react-redux";
import UserForm from "../components/UserForm";
import { COMMON, USER_ROLES } from "../utils/constants";
import { showError } from "../utils/toasts";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const token = localStorage.getItem(COMMON.TOKEN);
  const role = localStorage.getItem(COMMON.ROLE);
  const navigate = useNavigate();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  /* fetch all users */
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
      //redirect if not admin or unauthorized 
      navigate("/"); 
      showError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [token, navigate]);

  /* Edit user handler*/
  const updateUser = async (updatedData: User) => {
    await API.put(`/users/${updatedData.id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditingUser(null);
    //refresh users list
    fetchUsers(); 
  };

  /* Delete user handler */
  const deleteUser = async (userId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user and all their contacts?"
      )
    ) {
      await API.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); 
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
            <div className="row align-items-center mb-3">
        <div className="col">
          <h2 className="text-start">All Users</h2>
        </div>
        <div className="col text-end">
        {role === USER_ROLES.ADMIN && (
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/contacts")}
          >
            View All Contacts
          </button>
        )}
        </div>
      </div>
      <UserList
        users={users}
        // edit opens in form
        onUpdate={(c) => setEditingUser(c)} 
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
