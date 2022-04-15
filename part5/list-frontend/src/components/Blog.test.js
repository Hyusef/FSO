import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders title and author and when button clicked renders the rest ", () => {
  const blog = {
    title: "Rapid skill",
    author: "Yours truly",
    url: "www.rapidskill.com",
    likes: "10",
  };
  const user = { token: "123f4", username: "userofname" };
  const token = "123f4";

  const mockUpdateHandler = jest.fn();
  const deleteMockHandler = jest.fn();
  const likeMockHandler = jest.fn();

  render(
    <Blog
      blog={blog}
      handleUpdate={mockUpdateHandler}
      user={user}
      token={token}
    />
  );
  const renderedAuthor = screen.getByText("Rapid skill");
  const renderedTitle = screen.getByText("Yours truly");
  const renderedUrl = screen.queryByText("www.rapidskill.com");
  const renderedLikes = screen.queryByText("10");
  expect(renderedUrl).toBeNull();
  expect(renderedLikes).toBeNull();

  const button = screen.getByText("View");
  userEvent.click(button);

  expect(renderedUrl).toBeDefined();
  expect(renderedLikes).toBeDefined();

  const likeButton = screen.getByText("Like");
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  expect(likeButton.mock.calls.toHaveLength(2));
}); 

//make sure that if the like button is clicked twice the event handler that is passed as props is
//ran twice
