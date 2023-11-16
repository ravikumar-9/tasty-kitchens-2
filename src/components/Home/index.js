import {Component} from 'react'

import Header from '../Header'

import Carousel from '../Carousel'

import RestaurantsList from '../RestaurantsList'

import Footer from '../Footer'

import './home.css'

class Home extends Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        <Carousel />
        <RestaurantsList />
        <Footer />
      </div>
    )
  }
}

export default Home
