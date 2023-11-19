import {Link} from 'react-router-dom'

import './notFound.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://img.freepik.com/free-vector/search-concept-landing-page_23-2148250586.jpg?size=626&ext=jpg&ga=GA1.1.1927852465.1670052664&semt=ais"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found
    </p>
    <button type="button" className="home-button">
      <Link to="/" className="button-link">
        Home Page
      </Link>
    </button>
  </div>
)

export default NotFound
