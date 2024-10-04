import { useRouteLoaderData } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { ShowToDo } from "./ShowToDo";
import { Modal } from "./Modal";
import { useEffect, useState } from "react";
import axios from "axios";

export function TodoIndex() {
  const [isListShowVisible, setIsListShowVisible] = useState(false);
  const [currentList, setCurrentList] = useState (null);
  
  const loadedData = useLoaderData();
  const [list, setList] = useState(loadedData || []);

  useEffect(() => {
    console.log("Loaded data:", loadedData);
  }, [loadedData]);

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

  const handleToggleComplete = async (item) => {
    console.log("Toggling item:", item);
    if (!item || typeof item !== 'object' || !("id" in item)) {
      console.error('Invalid todo item:', item);
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:3000/todos/${item.id}.json`, {
        todo: {
          completed: !item.completed,
          deadline: item.deadline
        }
      });

      console.log("Server response:", response);

      if (response.status === 200) {
        // Update the local state to reflect the change
        setList(prevList => prevList.map(listItem => 
          listItem.id === item.id ? { ...listItem, completed: !listItem.completed } : listItem
        ));
      } else {
        console.error('Failed to update todo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <button type="button">Past Due</button> 
      <button type="button">All Active</button>
      <button type="button">Completed</button>
      <button type="button">All</button>
      <div className="list-container">
        {list.map(item => (
          <div key={item.id} className="list">
            <h2>{item.title}</h2>
            {/* <p>Description: {item.description}</p> */}
            <p>Deadline: {item.freindly_deadline}</p>
            <button type="more-info" onClick={() => handleShow(item)}>More Info</button>
            <button 
              type="button" 
              onClick={() => {
                console.log("Clicked item:", item);
                handleToggleComplete(item);
              }}
            >
              {item.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
            </button>
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