import React from "react";
import { FaUsers } from "react-icons/fa";

const Title = () => {

  return (
    <div className="bg-light p-4 rounded-3 shadow-sm d-flex align-items-center justify-content-between mb-4">
      <div className="d-flex align-items-center gap-3">
        <FaUsers size={65} className="text-success" />
        <div>
          <h1 className="mb-0">User Management</h1>

        </div>
      </div>

    </div>
  );
};

export default Title;
