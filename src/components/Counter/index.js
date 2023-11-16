import {Component} from 'react'

import './counter.css'

class Counter extends Component {
  onIncrement = () => {
    const {onIncrementPageNo} = this.props

    onIncrementPageNo()
  }

  onDecrement = () => {
    const {onDecrementPageNo} = this.props

    onDecrementPageNo()
  }

  render() {
    const {currentPageNo} = this.props

    return (
      <div className="counter-container">
        <button
          type="button"
          onClick={this.onDecrement}
          className="counter-button"
          data-testid="pagination-left-button"
        >
          -
        </button>
        <div className="page-number">
          <span data-testid="active-page-number">{currentPageNo}</span> of 4
        </div>
        <button
          type="button"
          onClick={this.onIncrement}
          className="counter-button"
          data-testid="pagination-right-button"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
