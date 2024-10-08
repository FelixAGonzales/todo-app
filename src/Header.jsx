import { LogoutLink } from "./LogoutLink"
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
      <Link to="/">Home</Link> | <Link to="/index">To-Do list</Link> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/todo/new">New</Link> | <LogoutLink /> 
      </nav>
    </header>
  )
}