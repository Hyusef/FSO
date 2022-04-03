import { useState } from "react";
import Personform from "./components/Personform";
import Persons from "./components/Persons";
import Filter from "./components/Filter";


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-20-20201" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const nameChange = (e) => {
    setNewName(e.target.value);
  };

  const numberChange = (e) => {
    setNumber(e.target.value);
  };

  const searchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    for (const prop in persons) {
      if (persons[prop].name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} has already been added`);
        return;
      }
    }
    setPersons(persons.concat({ name: newName, number: number }));
  };
  const searchArray = persons.filter((el) =>
    el.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchValue={searchValue} searchChange={searchChange}/> 
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
      />
    </div>
  );
};

export default App;
