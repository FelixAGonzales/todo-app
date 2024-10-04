import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import * as jwtDecode from 'jwt-decode';

export function ToDoNew() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryUpdateTrigger, setCategoryUpdateTrigger] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log("Token from localStorage:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode.jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        if (decodedToken.user_id) {
          setUserId(decodedToken.user_id);
          console.log("User ID set:", decodedToken.user_id);
        } else {
          console.error("Token does not contain 'user_id' claim");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

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
  }, [navigate, categoryUpdateTrigger]);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
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

    const categoryId = parseInt(params.get('category_id'), 10);
    if (isNaN(categoryId)) {
    alert('Please select a valid category');
    return;
    }

    params.set('category_id', categoryId);

    console.log("Current userId:", userId);
    if (userId) {
      params.append('user_id', parseInt(userId, 10));
    } else {
      console.error("User ID is not available");
      alert('User ID is missing. Please ensure you are logged in and try refreshing the page.');
      return;
    }

    axios.post("http://localhost:3000/todos.json", params)
      .then(response => {
        console.log("Todo created successfully:", response.data);
        navigate('/');
      })
      .catch(error => {
        console.error("Error submitting todo:", error.response?.data || error.message);
        if (error.response) {
          console.error("Server response:", error.response.data);
        }
        alert('Failed to create todo. Please check all fields and try again.');
      });
  };
  
  return (
    <div>
      <h1>What is the new Todo?</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categories">Category:</label>
        <select 
        name="category_id" 
        id="categories"
        value={selectedCategory}
        onChange={handleCategoryChange}
        required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
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