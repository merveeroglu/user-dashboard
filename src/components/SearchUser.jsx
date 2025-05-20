import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5"
import { GrClearOption } from "react-icons/gr";

const SearchUser = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };
    const handleClear = () => {
    setSearchInput("");
    onSearch("");
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search users..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="success" type="submit" className="d-flex gap-1 justify-content-center align-items-center">
            <IoSearchOutline/>
          Search
        </Button>        
        <Button variant="secondary" type="button" onClick={handleClear}  className="d-flex gap-1 justify-content-center align-items-center">
            <GrClearOption />
          Clear
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchUser;
