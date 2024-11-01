import {Routes, Route} from "react-router-dom"
import RegistrationForm from "./pages/RegistrationForm"
import StudentList from "./pages/StudentList"

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<RegistrationForm/>} />
      <Route path="/student-list" element={<StudentList/>} />
    </Routes>
  )
}

export default App
