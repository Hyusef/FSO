import { useState, useEffect } from "react";
import axios from "axios";
//use field hook for input
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

//useCountry hook that i need to implement
const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    if(name){
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        response.data ? setCountry(response.data) : setCountry(null);
      });
    }
  },[name]); 
  console.log(country);
  return country;
};

//Country component that renders the country passed to it as props
const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }
  console.log('country component: ',country);
  return (
    <div>
      <h3>{country[0].name.common}</h3>
      <div>population {country[0].population}</div>
      <div>capital {country[0].capital}</div>
      <img
        src={country[0].flags.png}
        height="100"
        alt={`flag of ${country[0].name.common}`}
      />
    </div>
  );
};

const App = () => {
  //the nameinput being used for the input onchange/value etc
  const nameInput = useField("text");
  //the name of the country that will be searched for. It is returned from the fetch submit handler
  const [name, setName] = useState("");
  //The hook that i will create which then returns a country to pass in to the country component as props
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
