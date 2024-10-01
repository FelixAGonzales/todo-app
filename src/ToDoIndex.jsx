
import { useRouteLoaderData } from "react-router-dom";

export function TodoIndex() {
  const list = [
    {id: 1, title: "Buy Groceries", description: "Buy Bananas, Apples, Oranges", deadline: "10/01/2024"},
    {id: 2, title: "File Taxes", description: "I need to file my taxes", deadline: "04/27/2025"},
  ]

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="list-container">
        {list.map(list => (
          <div key={list.id} className="list">
            <h2>{list.title}</h2>
            <p>Description: {list.description}</p>
            <p>Deadline: {list.deadline}</p>
            <button type="more-info" onClick={() => (list)}>More Info</button>
          </div>
        ))}
      </div>
    </div>
  );
}