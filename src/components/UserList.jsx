import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdModeEditOutline } from "react-icons/md";
import Pagination from "react-bootstrap/Pagination";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "./common/ConfirmModal";

const UserList = ({ search, setIsModalOpen, setSelectedUser, newUsers }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const loadData = async (page) => {
    const skip = (page - 1) * limit;
    try {
      const response = await fetchUsers(skip, search);

      let fetchedUsers = response?.users || [];
      let total = response?.total || 0;

      const storedUsers = JSON.parse(localStorage.getItem("newUsers")) || [];

      // Arama filtresine uyan local kullanıcılar için
      const filteredStoredUsers = storedUsers.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(search.toLowerCase());
      });

      const totalPages = Math.ceil(
        (total + filteredStoredUsers.length) / limit
      );

      if (page === totalPages) {
        fetchedUsers = [...fetchedUsers, ...filteredStoredUsers];
      }

      setUsers(fetchedUsers);
      setTotalUsers(total + filteredStoredUsers.length);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPages = Math.ceil(totalUsers / limit);

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const id = userToDelete?.id;
    if (!id) return;

    const storedUsers = JSON.parse(localStorage.getItem("newUsers")) || [];
    const updatedUsers = storedUsers.filter((user) => user.id !== id);
    localStorage.setItem("newUsers", JSON.stringify(updatedUsers));

    setUsers((prev) => prev.filter((user) => user.id !== id));
    setConfirmDialogOpen(false);
    setUserToDelete(null);
  };

  useEffect(() => {
    setPage(1);
    loadData(1);
  }, [search]);

  useEffect(() => {
    loadData(page);
  }, [page, newUsers]);

  return (
    <>
      <ConfirmModal
        show={confirmDialogOpen}
        title="Kullanıcıyı Sil"
        message={`${userToDelete?.firstName} ${userToDelete?.lastName} adlı kullanıcıyı silmek istediğinize emin misiniz?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmDialogOpen(false);
          setUserToDelete(null);
        }}
      />

      <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
        <div className="border rounded px-4 py-2 mt-4 bg-light shadow-sm">
          <strong>Toplam Kullanıcı:</strong> {totalUsers}
        </div>
        <Button
          variant="success"
          size="sm"
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
          className="px-5 mt-3"
        >
          + Add New
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>University</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.university}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 mx-3">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      <MdModeEditOutline />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination className="pagination-success">
          {renderPaginationItems()}
        </Pagination>
      </div>
    </>
  );
};

export default UserList;
