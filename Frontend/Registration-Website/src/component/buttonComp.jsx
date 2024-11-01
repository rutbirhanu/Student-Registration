/* eslint-disable react/prop-types */
import "../pages/pages.css"

function ButtonComp(props) {
  return (
      <div className="button-container">
          <button className="signup-btn" onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

export default ButtonComp