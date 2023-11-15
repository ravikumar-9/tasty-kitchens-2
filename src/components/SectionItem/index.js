import {Link} from 'react-router-dom'

import './sectionItem.css'

const SectionItem = props => {
  const {optionDetails, isActive} = props

  console.log(isActive)

  const {displayText, path} = optionDetails

  const activeClassName = isActive ? 'active-option' : 'in-active-option'

  return (
    <p className={activeClassName}>
      <Link to={path} className="nav-link">
        {displayText}
      </Link>
    </p>
  )
}

export default SectionItem
