/* eslint-disable react/prop-types */
import "../pages/pages.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function InputField(props) {
    return (
        <div className="input-container">
            <div className="field-container">
                {/* <i className="fa-solid fa-user"></i> */}
                <FontAwesomeIcon icon={props.icon} className="icon" />
                <label>{props.label}</label>
                <input type="text" id="text-input" value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name} required pattern={props.pattern} />
            </div>
            <span style={{ color: "red", fontSize:"14px", padding:"5px"}}>{props.errorMessage}</span>
        </div>

    )
}

export default InputField