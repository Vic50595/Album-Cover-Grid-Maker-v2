import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/#section1">Home :)</Link></li>
        <li><a href="/#section2">Grid Maker</a></li>
        <li><Link to="/about">About Me</Link></li>
      </ul>
    </nav>
  )
}
