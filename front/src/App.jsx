import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "./redux/slice";
import { Popup } from "./components/Popup/Popup";
import Card from "./components/Card/Card";
import "./App.css";
import MyLoader from "./components/Loader/Loader";

function App() {
  const load = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.users);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(fetchUsers(inputValue));
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, dispatch]);

  // const filteredUsers = users.filter((user) =>
  //   user.name.toLowerCase().includes(inputValue?.toLowerCase())
  // ); // если будем делать живой поиск по массиву, который и так приходит с запросом fetchUsers.

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

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
    <div onClick={handleBackgroundClick} className="content">
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
        {load && <MyLoader />}
        {!load &&
          users.map((user, ind) => (
            <Card key={ind} user={user} handleCardClick={handleCardClick} />
          ))}
        {/* {filteredUsers.map((user, ind) => {
          return (
            <Card key={ind} user={user} handleCardClick={handleCardClick}/>
          );
        })} */}
      </main>
      {selectedUser && (
        <Popup user={selectedUser} closePopup={handlePopupClose} />
      )}
    </div>
  );
}

export default App;
