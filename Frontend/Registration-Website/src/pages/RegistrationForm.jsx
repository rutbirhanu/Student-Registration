import { useState } from "react"
import ButtonComp from "../component/buttonComp"
import InputField from "../component/inputField"
import { Link } from "react-router-dom"
import SnackBar from "../component/snackBarComp"
import "./pages.css"
import { faUser, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons'
import "../component/dropdown.css"


function RegistrationForm() {

    const [values, setValues] = useState({
        name: "",
        email: "",
        age: "",
        course:""
    })

    const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState("Courses");

    const options = ["Computer Science",
        " Electrical Engineering",
        "Psychology",
        "Business Administration",
        "Biology"];


    const handleOptionClick = (option) => {
        setValues((prevValues) => ({
            ...prevValues,
            course: option // Update course value
          }));
        // setSelectedOption(option);
        setIsOpen(false);
    };

    const [errors, setErrors] = useState({})
    const [showSnackBar, setShowSnackBar] = useState(false)

    const validate = (value) => {
        let tempErrors = {};
        if (!value.name) tempErrors.name = "Name should be greater than 2 letter";
        if (!value.email) {
            tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!value.age) {
            tempErrors.age = 'Age is required';
        } else if (!/^(100|[1-9][0-9])$/.test(value.age)) {
            tempErrors.age = 'Age must be between 10 and 100';
        }
        if (!value.course) {
            tempErrors.course = 'Course is required';
        } 
        return tempErrors
    };


    const onChange = (e) => {
        const { name, value, checked, type } = e.target
        const current = type === "checkbox" ? checked : value

        setValues({ ...values, [name]: current })
    }

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault()
            setShowSnackBar(false);

            const tempErrors = validate(values)
            setErrors(tempErrors)
            console.log(values)
            if (Object.keys(tempErrors).length === 0) {
                setShowSnackBar(false)
                const response = await fetch("http://localhost:2000/student/registration", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                });

                const formRes = await response.json()
                console.log(formRes)
                if (response.ok) {
                    setShowSnackBar(true)
                    setValues({ ...values, [e.target.name]: ""})
                    console.log("everything ok")
                }
            }
            else {
                console.log("Form has validation errors.");
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCloseSnackBar = () => {
        setShowSnackBar(false);
    };


    return (
        <div>
            <Link to="/student-list">
                <a style={{ fontSize: "18px", display: "inline-block", margin: "1em", textDecoration: "underline" }}>Registered Students</a>
            </Link>
            <div className="parent-container">
                <div className="page-container">
                    <h2>Student Registration</h2>

                    <form onSubmit={handleFormSubmit}>
                        <div className="row-fields">
                            <InputField label="Name" icon={faUser} name="name" errorMessage={errors.name} pattern="^[A-Za-z]{2,14}$" placeholder="Eyeresualem" value={values.name} onChange={onChange} />
                        </div>
                        <InputField label="Email" name="email" icon={faEnvelope} placeholder="birhanu@gmail.com" pattern="^\S+@\S+\.\S+$" errorMessage={errors.email} value={values.email} onChange={onChange} />
                        <InputField label="Age" name="age" icon={faEye} placeholder="23" pattern="^(100|[1-9][0-9])$" value={values.age} errorMessage={errors.age} onChange={onChange} />
                        <div className="dropdown" >
                            <p>Select Your Course</p>
                            <button onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle" >
                                {values.course || "Courses"}
                            </button>
                            {isOpen && (
                                <ul className="dropdown-menu">
                                    {options.map((option, index) => (
                                        <li key={index} onClick={() => handleOptionClick(option)}>
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                             {errors.course && <span style={{ color: "red", fontSize:"14px", padding:"5px"}}>{errors.course}</span>}
                        </div>

                    </form>

                    <ButtonComp text="Register" onClick={handleFormSubmit} />

                    {
                        showSnackBar && <SnackBar visible={showSnackBar} onClose={handleCloseSnackBar} />}
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm