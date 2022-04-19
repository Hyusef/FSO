import Anecdoteform from "./components/Anecdoteform";
import Anecdotelist from "./components/Anecdotelist";
import Notification from "./components/Notification";
import { useEffect } from "react";
import Filter from "./components/Filter";
import quotes from "./services/quotes";
import anecdoteReducer, {
  appendBlog,
  setBlog,
  initializeApp,
} from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch]);
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
