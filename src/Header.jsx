import { LogoutLink } from "./LogoutLink"
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <a href="#">Home</a> | <a href="#">Link</a> | <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <LogoutLink /> 
      </nav>
    </header>
  )
}