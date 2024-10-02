import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const list = [
  { title: "Buy Groceries", description: "Buy Bananas, Apples, Oranges", deadline: new Date(2024, 9, 1), category: "Groceries" }, 
  { title: "File Taxes", description: "I need to file my taxes", deadline: new Date(2025, 3, 27), category: "Personal" }, 
];

export function ToDoPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const getListForDate = (date) => {
    return list.filter(list => list.deadline.toDateString() === date.toDateString());
  };

  return (
    <main className="calendar-page">
      <h1>To-Do Calendar</h1>
      <div>
        <Calendar value={currentDate} onChange={handleDateChange} />
        <h2>Tasks for {currentDate.toDateString()}</h2>
        <ul>
          {getListForDate(currentDate).map(list => (
            <li key={list.title}>{list.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}