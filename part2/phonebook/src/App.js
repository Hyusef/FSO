import { useState, useEffect } from "react";
import Personform from "./components/Personform";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import axios from "axios";
import personService from "./services/persons";
import SuccessAlert from "./components/SuccessAlert";
import Erroralert from "./components/Erroralert";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((resp) => {
      setPersons(resp.data);
    });
  }, []);

  const nameChange = (e) => {
    setNewName(e.target.value);
  };

  const numberChange = (e) => {
    setNumber(e.target.value);
  };

  const searchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const deleteHandler = (i, el) => {
    if (window.confirm(`Do you want to delete ${el.name}`)) {
      axios.delete(`http://localhost:3001/persons/${i}`);
    }
    personService.getAll().then((resp) => {
      setPersons(resp.data);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const personArr = [];
    for (const prop in persons) {
      personArr.push(persons[prop].name);
      if (persons[prop].name.toLowerCase() === newName.toLowerCase()) {
        if (window.confirm(`Do you want to update ${persons[prop].name}`)) {
          axios
            .put(`http://localhost:3001/persons/${persons[prop].id}`, {
              name: newName,
              number: number,
            })
            .then((resp) => {
              console.log(resp);
              setSuccessMessage(`Updated ${persons[prop].name}`);
              setTimeout(() => {
                setSuccessMessage(null);
              }, 3000);
            })
            .catch((err) => {
              setErrorMessage(`${persons[prop].name} has already been deleted`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 3000);
              return;
            });
        }
      }
    }

    if (persons.length === 0 || !personArr.includes(newName)) {
      axios
        .post("http://localhost:3001/persons", {
          name: newName,
          number: number,
        })
        .then((response) => {
          console.log(response);
        });
    }

    personService.getAll().then((resp) => {
      setPersons(resp.data);
    });
  };

  const searchArray = persons.filter((el) =>
    el.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <SuccessAlert message={successMessage} />
      <Erroralert message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} searchChange={searchChange} />
      <Personform
        submitHandler={submitHandler}
        numberChange={numberChange}
        newName={newName}
        number={number}
        nameChange={nameChange}
      />

      <h2>Numbers</h2>
      <Persons
        searchValue={searchValue}
        searchArray={searchArray}
        persons={persons}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
