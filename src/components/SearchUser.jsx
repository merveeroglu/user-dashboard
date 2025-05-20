import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

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
        <Button variant="success" type="submit">
          Search
        </Button>        
        <Button variant="secondary" type="button" onClick={handleClear}>
          Clear
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchUser;
