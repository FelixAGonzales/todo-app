import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
// import { useLoaderData } from "react-router-dom";
// import React from "react";

export function ToDoNew() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNewCategoryForm, setShowNewCategoryForm] = useState (false);
  const [newCategory, setNewCategory] = useState('');

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected)
    console.log(selected);

    if (selected == 'add_new') {
      setShowNewCategoryForm(true);
    } else{
      setShowNewCategoryForm(false);
    }
  };

  const handeNewCategorySubmit = (category) => {
    console.log(`New Category is: ${category}`);
    setNewCategory(category);
    setShowNewCategoryForm(false);
    setSelectedCategory(category);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('handle submit')
    const params = new FormData(event.target)
    console.log("Form Data:");
    for (let [key, value] of params.entries()) {
      console.log(key + ': ' + value); 
    };
    // axios.post ("http://localhost:3000/posts.json", params).then(response => {
    //   console.log(response.data)
    //   navigate('/');
    // })
  };

  const categories =[
    {id:1, name:"Shopping"}, {id:2, name:"Work"}
  ];

  // const categories = useLoaderData()
  
  return (
    <div>
      <h1>What is the new Todo?</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categories">Category:</label>
        <select 
        name="categories" 
        id="categories"
        value={selectedCategory}
        onChange={handleCategoryChange}>
        <option value=""> Select a category</option>
          {categories.map((category) => (
            <option key = {category.id} value={category.name}>
              {category.name}
            </option>
          ))}
          <option value='add_new'>Add new</option>
        </select>
        <br></br>

        {showNewCategoryForm && (
          <div>
            <input
              name="newCategory"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
            />
            <button type="button" onClick={() => handeNewCategorySubmit(newCategory)}>Add Category</button>
          </div>
        )}

        <br></br>
        <div>
          Title: <input type="text" name="title" />
        </div>
        <div>
          Description: <input type="text" name="description" />
        </div>
        <div>
          Deadline: <input type="date" name="deadline" />
        </div>
        {/* <div>
          Completed? <input type="checkbox" name="completed" />
        </div> */}
        <button type="submit"> Add</button>
      </form>
    </div>
  );
}