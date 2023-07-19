import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import UserDataService from "../services/user-services";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await UserDataService.getAllUsers();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await UserDataService.deleteUser(id);
    getUsers();
  };
  return (
    <>
      <div className="grid grid-cols-1 px-5 my-4">
        <div className="mb-2">
          <Button variant="dark edit" onClick={getUsers}>
            Refresh List
          </Button>
        </div>

        {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>WPM</th>
              <th>Characters</th>
            </tr>
          </thead>
          <tbody>
            {users.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.age}</td>
                  <td>{doc.wpm}</td>
                  <td>{doc.characters}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="delete"
                      onClick={(e) => deleteHandler(doc.id)}
                    ></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UsersList;
