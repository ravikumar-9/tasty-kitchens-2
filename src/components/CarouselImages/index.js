import './index.css'

const CarouselImages = props => {
  const {carouselDetails} = props

  const {imageUrl} = carouselDetails

  return (
    <div>
      <img src={imageUrl} alt="offer" className="carousel-image" />
    </div>
  )
}

export default CarouselImages
