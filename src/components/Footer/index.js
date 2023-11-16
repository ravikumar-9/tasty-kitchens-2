import {
  FaPinterestSquare,
  FaInstagramSquare,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <img
          src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-website-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-des">
        The only thing we are serious about is food.
        <br />
        Contact us on
      </p>

      <div className="media-icons-container">
        <FaPinterestSquare
          fill="white"
          size="24"
          testid="pintrest-social-icon"
        />
        <FaInstagramSquare
          fill="white"
          size="24"
          testid="instagram-social-icon"
        />
        <FaTwitter fill="white" size="24" testid="twitter-social-icon" />
        <FaFacebookSquare
          fill="white"
          size="24"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
