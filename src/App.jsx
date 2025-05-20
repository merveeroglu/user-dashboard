import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";
import { useState } from "react";
import SearchUser from "./components/SearchUser";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const [search, setSearch] = useState("")
    console.log("search", search);


  return (
    <>
      <SearchUser onSearch={setSearch} />    
      <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={selectedUser} setUser={setSelectedUser} />
      <UserList  search={search}  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setSelectedUser={setSelectedUser}/>
    </>
  );
}

export default App;
