import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserList from "./components/UserList";
import UserModal from "./components/UserModal";
import { useState } from "react";
import SearchUser from "./components/SearchUser";
import Title from "./components/Title";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const [search, setSearch] = useState("")
    const [newUsers, setNewUsers] = useState([])  // locale kullanıcı ekleyince sayfa yenilenmesi için yeni ekledim


  return (
    <div style={{ minHeight: "80vh", minWidth:"80vw"}}>
      <Title/>
      <SearchUser onSearch={setSearch} />    
      <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={selectedUser} setUser={setSelectedUser} setNewUsers={setNewUsers}/>
      <UserList search={search} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setSelectedUser={setSelectedUser} newUsers={newUsers}/>
    </div>
  );
}

export default App;
