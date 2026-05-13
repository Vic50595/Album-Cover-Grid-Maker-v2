import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  function goToSection(e, id) {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 50)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav>
      <ul>
        <li><a href="/#section1" onClick={e => goToSection(e, 'section1')}>Home :)</a></li>
        <li><a href="/#section2" onClick={e => goToSection(e, 'section2')}>Grid Maker</a></li>
        <li><Link to="/about">About Me</Link></li>
      </ul>
    </nav>
  )
}
