import Anecdoteform from "./components/Anecdoteform";
import Anecdotelist from "./components/Anecdotelist";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotelist />
      <Anecdoteform />
    </div>
  );
};

export default App;
