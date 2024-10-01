export function ShowToDo({currentList}) {
  return (
    <div>
      <h2>{currentList.title}</h2>
      <p>Description: {currentList.description}</p>
      <p>Deadline: {currentList.deadline}</p>
    </div>
  )
}