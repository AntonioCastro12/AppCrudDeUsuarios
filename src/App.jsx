import { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";
import UserList from "./components/UserList";


const BASE_URL = "https://users-crud.academlo.tech";


const DEFAULT_VALUES = {
  birthday: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};
function App() {
  const [isShownModal, setIsShowModal] = useState(false);

  const [users, setUsers] = useState([]);

  const [isUserToUpdate, setIsUserToUpdate] = useState();

  
  const changeShowModal = () => {
    console.log("Cambio Modal");
    setIsShowModal(!isShownModal);
  };

  
  const getAllUsers = () => {
    const url = BASE_URL + "/users/";
    axios
      .get(url)
      .then(({ data }) => {
       
        setUsers(data); 
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        
      });
  };

  
  const createUser = (data, reset) => {
    const url = BASE_URL + "/users/";
    axios
      .post(url, data)
      .then(({ data }) => {
        
        getAllUsers();
        resetModalForm(reset);
      })
      .catch((err) => {
       
      })
      .finally(() => {
        
      });
  };

  
  const deleteUser = (id) => {
    const url = BASE_URL + `/users/${id}/`;
    axios
      .delete(url)
      .then(() => {
        getAllUsers();
      })
      .catch((err) => {
        console.log("Error realizando DELETE ");
      });
  };
 
  const updateUser = (data, reset) => {
    const url = BASE_URL + `/users/${isUserToUpdate.id}/`;
    console.log("Patching:", data);
    axios
      .patch(url, data)
      .then(() => {
        getAllUsers();
        resetModalForm(reset);
      })
      .catch((err) => {
        console.log("Error realizando PATCH ");
      });
  };
 
  const resetModalForm = (reset) => {
    setIsShowModal(false);
    reset(DEFAULT_VALUES);
    setIsUserToUpdate(null);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <main className='font-["Roboto"] max-w-[1024px] flex flex-col align-middle pb-2'>
      <Header changeShowModal={changeShowModal} />

      <ModalForm
        changeShowModal={changeShowModal}
        isShownModal={isShownModal}
        createUser={createUser}
        isUserToUpdate={isUserToUpdate}
        updateUser={updateUser}
        resetModalForm={resetModalForm}
      />

      <UserList
        users={users}
        deleteUser={deleteUser}
        changeShowModal={changeShowModal}
        setIsUserToUpdate={setIsUserToUpdate}
      />
      <div className="text-center font-bold py-2">Academlo 2024.</div>
    </main>
  );
}

export default App;
