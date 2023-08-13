import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "./redux/slice";
import { Popup } from "./components/Popup";
import Card from "./components/Card";
import "./App.css";

function App() {
  const users = useSelector((state) => state.users.users);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(inputValue?.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const handlePopupClose = () => {
    setSelectedUser(null);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.closest(".popupContainer")) {
      handlePopupClose();
    }
  };

  return (
    <div onClick={handleBackgroundClick}>
      <div className="formInput">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <main>
        {filteredUsers.map((user, ind) => {
          return (
            <Card key={ind} user={user} handleCardClick={handleCardClick}/>
          );
        })}
      </main>
      {selectedUser && (
        <Popup user={selectedUser} closePopup={handlePopupClose} />
      )}
    </div>
  );
}

export default App;
