import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export function ToDoNew() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryUpdateTrigger, setCategoryUpdateTrigger] = useState(0);

  useEffect(() => {
    const fetchCategories = () => {
      axios.get("http://localhost:3000/categories.json")
        .then(response => {
          console.log("API Response:", response.data);
          if (Array.isArray(response.data)) {
            setCategories(response.data);
          } else {
            console.error("Received data is not an array:", response.data);
            setCategories([]);
          }
        })
        .catch(error => {
          console.error("Error fetching categories:", error);
        });
    };

    fetchCategories();
  }, [categoryUpdateTrigger]);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected)
    console.log(selected);

    if (selected == 'add_new') {
      setShowNewCategoryForm(true);
    } else {
      setShowNewCategoryForm(false);
    }
  };

  const handleNewCategorySubmit = (event) => {
    event.preventDefault();
    const params = new FormData();
    params.append('name', newCategory);

    axios.post("http://localhost:3000/categories.json", params)
      .then(response => {
        console.log(response.data);
        setNewCategory('');
        setShowNewCategoryForm(false);
        setSelectedCategory(response.data.name);
        setCategoryUpdateTrigger(prev => prev + 1);
      })
      .catch(error => {
        console.error("Error creating new category", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new FormData(event.target)
    console.log("Form Data:");
    for (let [key, value] of params.entries()) {
      console.log(key + ': ' + value); 
    };
    axios.post ("http://localhost:3000/todos.json", params).then(response => {
      console.log(response.data)
      navigate('/');
    })
  };
  
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
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
          <option value='add_new'>Add new</option>
        </select>
        <br />

        {showNewCategoryForm && (
          <div>
            <input
              name="newCategory"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
            />
            <button type="button" onClick={handleNewCategorySubmit}>Add Category</button>
          </div>
        )}

        <br />
        <div>
          Title: <input type="text" name="title" />
        </div>
        <div>
          Description: <input type="text" name="description" />
        </div>
        <div>
          Deadline: <input type="date" name="deadline" />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}