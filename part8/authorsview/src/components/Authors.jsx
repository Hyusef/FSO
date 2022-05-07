import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const EDIT_AUTHOR = gql`
  mutation Mutation($name: String!, $setBorn: Int!) {
    editAuthor(name: $name, setBorn: $setBorn) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const [editAuthor, { data, loading, error }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: props.rAuthors }],
  });
  const [selected, setSelected] = useState("");

  if (!props.show) {
    return null;
  }

  if (error) {
    console.log(error.networkError.result.errors);
  }

  let authors;
  if (props.myData.data) {
    authors = props.myData.data.allAuthors;
  }

  if (!authors) {
    return null;
  }

  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const born = e.target.born.value;
    editAuthor({ variables: { name: selected, setBorn: parseInt(born) } });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set BirthYear</h2>
      <form onSubmit={handleUpdate}>
        <select value={selected} onChange={handleChange}>
          {authors.map((a) => (
            <option value={a.name}>{a.name}</option>
          ))}
        </select>
        <input type="number" placeholder="Born" name="born"></input>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};


export default Authors;
