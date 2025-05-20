import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdModeEditOutline } from "react-icons/md";
import Pagination from "react-bootstrap/Pagination";

const UserList = ({ search, setIsModalOpen, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;
console.log("search0, search", search);

  const loadData = async (page) => {
     const skip = (page - 1) * limit;
    try {
      const response = await fetchUsers(skip, search);
      console.log("response", response);
      setUsers(response?.users);
      setTotalUsers(response?.total);
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

  useEffect(() => {
    loadData(page);
  }, [page, search]);



  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant="success"
          size="sm"
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
          className="px-4 mt-5"
        >
          + Add New
        </Button>
      </div>
      <div style={{ minHeight: "60vh" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>University</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.university}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  <MdModeEditOutline />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table></div>
            <div className="d-flex justify-content-center">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
    </div>
  );
};

export default UserList;
