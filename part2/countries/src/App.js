import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const capital = country.capital[0];
  const countryName = country.name.common;
  const continent = country.continents[0];
  const population = country.population;
  const officialName = country.name.official;
  const timezone = country.timezones[0];

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((resp) => setWeather(resp.data));
  }, []);

  let temp;
  let description;
  let weatherIcon;
  if (weather.length != 0) {
    temp = weather.main.temp;
    description = weather.weather[0].description;
    weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  }

  return (
    <>
      <h1> {countryName}</h1>
      <p>Capital: {capital}</p>
      <h4>Continent: {continent}</h4>
      <h4>Population : {population}</h4>
      <h4>Official name: {officialName}</h4>
      <h4>Timezone: {timezone}</h4>
      <img alt="flag" src={country.flags.png}></img>
      <h2>Weather for {capital}</h2>
      {weather != null && (
        <>
          <h3>
            The weather in {capital} is {temp} celsius with {description}{" "}
          </h3>
          <img src={weatherIcon} alt="weather icon"></img>
        </>
      )}
    </>
  );
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [show, setShow] = useState(null);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const showHandler = (i) => {
    if (show === i) {
      setShow(null);
    } else {
      setShow(i);
    }
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((resp) => {
      setAllCountries(resp.data);
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((resp) => console.log(resp.data));
  }, []);

  const searchResults = allCountries.filter((el) => {
    return el.name.common.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="App">
      Search: <input value={searchValue} type="text" onChange={searchHandler} />
      <div>
        {searchResults.length > 10 ? (
          "too many countries,be more specific"
        ) : searchResults.length === 1 ? (
          <>
            <Country country={searchResults[0]} />
          </>
        ) : (
          searchResults.map((el, i) => {
            return (
              <>
                <p>{el.name.common}</p>
                <button onClick={() => showHandler(i)}>Show</button>
                {show === i && (
                  <>
                    <p>Capital: {el.capital[0]}</p>
                    <img alt="flag" src={el.flags.png}></img>
                  </>
                )}
              </>
            );
          })
        )}
      </div>
    </div>
  );
}
export default App;
