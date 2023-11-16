import {Component} from 'react'

import Cookies from 'js-cookie'

import {MdSort} from 'react-icons/md'

import Counter from '../Counter'

import EachRestaurant from '../EachRestaurant'

import './restaurantsList.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const resApiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
}

// const RestaurantsList

class RestaurantsList extends Component {
  state = {
    currentPageNo: 1,
    activeOptionId: sortByOptions[0].value,
    apiStatus: resApiConstants.initial,
    restaurantsListArray: [],
    searchInput: '',
  }

  componentDidMount = () => {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const {activeOptionId, currentPageNo, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const LIMIT = 9
    const offset = (currentPageNo - 1) * LIMIT
    const url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeOptionId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Barer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const responseData = await response.json()
      // console.log(responseData)

      const updatedRestaurantResponse = responseData.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      console.log(updatedRestaurantResponse)
      this.setState({
        restaurantsListArray: updatedRestaurantResponse,
        apiStatus: resApiConstants.success,
      })
    }
  }

  onIncrementPageNo = () => {
    this.setState(
      prevState => ({
        currentPageNo: prevState.currentPageNo + 1,
      }),
      this.getRestaurantsList,
    )
  }

  onDecrementPageNo = () => {
    const {currentPageNo} = this.state

    if (currentPageNo > 1) {
      this.setState(
        prevState => ({
          currentPageNo: prevState.currentPageNo - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onChangeActiveOption = event => {
    this.setState({activeOptionId: event.target.value}, this.getRestaurantsList)
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value}, this.getRestaurantsList)

  render() {
    const {
      currentPageNo,
      activeOptionId,
      apiStatus,
      restaurantsListArray,
      searchInput,
    } = this.state

    console.log(apiStatus)
    // console.log(restaurantsListArray)
    return (
      <div className="restaurants-list-container">
        <div className="sort-by-header-container">
          <div className="sort-by-header">
            <div>
              <h1 className="popular-heading">Popular Restaurants</h1>
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="popular-rest-description input-field"
                placeholder="Select Your favorite restaurant special dish and make your day
                happy..."
              />
            </div>
            <div className="sort-by-options-container">
              <MdSort size={24} />
              <select
                value={activeOptionId}
                onChange={this.onChangeActiveOption}
                className="options-field"
              >
                {sortByOptions.map(eachOption => (
                  <option key={eachOption.id} value={eachOption.value}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="restaurants-list">
          {restaurantsListArray.map(restaurantDetails => (
            <EachRestaurant
              key={EachRestaurant.id}
              restaurantDetails={restaurantDetails}
            />
          ))}
        </div>
        <Counter
          currentPageNo={currentPageNo}
          onIncrementPageNo={this.onIncrementPageNo}
          onDecrementPageNo={this.onDecrementPageNo}
        />
      </div>
    )
  }
}

export default RestaurantsList
