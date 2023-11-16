import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import './eachRestaurant.css'

const EachRestaurant = props => {
  console.log(props)

  const {restaurantDetails} = props

  const {id, imageUrl, name, cuisine, userRating} = restaurantDetails

  const {ratingColor, rating, totalReviews} = userRating

  console.log(id)

  return (
    <li className="each-restaurant">
      <Link to={`\restaurant\${id}`} className="links">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div>
          <h1 className="each-restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="ratings-container">
            <FaStar size="20" color={ratingColor} />
            <p className="each-restaurant-rating">{rating}</p>
            <p className="total-reviews">({totalReviews})</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default EachRestaurant
