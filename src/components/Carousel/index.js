import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import CarouselImages from '../CarouselImages'

import './carousel.css'

const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const offersLoaderApiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Carousel extends Component {
  state = {
    offerCarouselList: [],
    offerLoaderApiStatus: offersLoaderApiConstants.initial,
  }

  componentDidMount() {
    this.getOffersList()
  }

  getOffersList = async () => {
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Barer ${jwtToken}`,
      },
    }

    this.setState({offerLoaderApiStatus: offersLoaderApiConstants.inProgress})

    const carouselResponse = await fetch(url, options)

    if (carouselResponse.ok === true) {
      const carouselResponseData = await carouselResponse.json()

      const updatedCarouselList = carouselResponseData.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))

      this.setState({
        offerCarouselList: updatedCarouselList,
        offerLoaderApiStatus: offersLoaderApiConstants.success,
      })
    }
  }

  renderOffersLoader = () => (
    <div
      className="offers-loader-container"
      data-testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderOffersCarousel = () => {
    const {offerCarouselList} = this.state

    return (
      <div className="carousel-container">
        <div className="slider-container">
          <Slider {...settings}>
            {offerCarouselList.map(eachCarousel => (
              <CarouselImages
                carouselDetails={eachCarousel}
                key={eachCarousel.id}
              />
            ))}
          </Slider>
        </div>
      </div>
    )
  }

  render() {
    const {offerLoaderApiStatus} = this.state

    switch (offerLoaderApiStatus) {
      case offersLoaderApiConstants.inProgress:
        return this.renderOffersLoader()

      case offersLoaderApiConstants.success:
        return this.renderOffersCarousel()
      default:
        return null
    }
  }
}

export default Carousel
