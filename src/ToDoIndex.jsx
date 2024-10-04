
import { useRouteLoaderData } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { ShowToDo } from "./ShowToDo";
import { Modal } from "./Modal";
import { useState } from "react";

export function TodoIndex() {
  const [isListShowVisible, setIsListShowVisible] = useState(false);
  const [currentList, setCurrentList] = useState (null);
  
  const  list = useLoaderData();
  console.log(list)
  // const list = [
  //   {id: 1, title: "Buy Groceries", description: "Buy Bananas, Apples, Oranges", deadline: "10/01/2024", category: "Groceries" },
  //   {id: 2, title: "File Taxes", description: "I need to file my taxes", deadline: "04/27/2025", category: "Personal"},
  // ]

  const handleShow = (listItem) => {
    setCurrentList(listItem);
    setIsListShowVisible(true);
  };

  const handleClose = () => {
    setIsListShowVisible(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}-${day}-${year}`;
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <div className="list-container">
        {list.map(item => (
          <div key={item.id} className="list">
            <h2>{item.title}</h2>
            {/* <p>Description: {item.description}</p> */}
            <p>Deadline: {formatDate(item.deadline)}</p>
            <button type="more-info" onClick={() => handleShow(item)}>More Info</button>
          </div>
        ))}
      </div>

      <div>
        <Modal show={isListShowVisible} onClose={handleClose}>
          <ShowToDo currentList={currentList} />
        </Modal>
      </div>
    </div>
    

  );

  
}