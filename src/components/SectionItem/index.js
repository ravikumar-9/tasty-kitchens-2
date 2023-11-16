import {Link} from 'react-router-dom'

import './sectionItem.css'

const SectionItem = props => {
  const {optionDetails, isActive} = props

  console.log(isActive)

  const {displayText, path} = optionDetails

  const activeClassName = isActive ? 'active-option' : 'in-active-option'

  return (
    <li className="tab-item">
      <Link to={path} className={`nav-link ${activeClassName}`}>
        {displayText}
      </Link>
    </li>
  )
}

export default SectionItem
