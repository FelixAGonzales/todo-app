// export function ShowToDo({currentList}) {
//   return (
//     <div>
//       <h2>{currentList.title}</h2>
//       <p>Description: {currentList.description}</p>
//       <p>Deadline: {currentList.deadline}</p>
//     </div>
//   )
// }


// export function ShowToDo({ currentList }) {
//   return (
//     <div>
//       <h2>{currentList.title}</h2>
//       <p>Description: {currentList.description}</p>
//       <p>Deadline: {currentList.deadline ? currentList.deadline.toDateString() : ''}</p>
//       <p>Category: {currentList.category}</p>
//     </div>
//   );
// }


// export function ShowToDo({ currentList }) {
//   return (
//     <div>
//       <h2>{currentList.title}</h2>
//       <p>Description: {currentList.description}</p>
//       {/* Ensure deadline is displayed properly */}
//       <p>Deadline: {currentList.deadline instanceof Date ? currentList.deadline.toDateString() : currentList.deadline}</p>
//       <p>Category: {currentList.category}</p>
//     </div>
//   );
// }

export function ShowToDo({ currentList }) {
  if (!currentList) return null;

  return (
    <div className="todo-details">
      <h2>{currentList.title}</h2>
      <p>Description: {currentList.description}</p>
      <p>Deadline: {currentList.freindly_deadline}</p>
      <p>Category: {currentList.category.name}</p>
      <p>Created by: {currentList.user.name}</p>
      <p>Status: {currentList.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
}