import { useEffect, useState } from "react";
import "./pages.css"
import { Link } from "react-router-dom";

function StudentList() {

  const [studentsList, setStudentsList] = useState([])
  const [count, setCount]= useState("")
  
  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch("http://localhost:2000/student/get-students", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

      const formRes = await response.json()
      setStudentsList(formRes.student)
      setCount(formRes.count)
      
    if (response.ok) {
        console.log("everything ok")
      }
      else {
        console.log("Form has validation errors.");
    }
}
fetchData()
    
  }, [])
  
  return (
    <div className="students-page-container">
      <Link to="/">
      <span style={{ fontSize: "24px;"}}>&#8592; Back to  Registration</span>    
      </Link>
        <h1>Registered Students</h1>
        <div className="info-card-container">
          <h4>Total Students Registered</h4>
        <h2>{count}</h2>
        </div>
        <div className="students-list">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Course</th>
              </tr>
            </thead>

            <tbody>
              {
                studentsList.map((student, index) => {
                  return <tr key={index} style={{ backgroundColor:"rgb(147, 65, 65)"}}>
                    <td>{index+1}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    
                 </tr> 
                 })
              } 
            </tbody>

          </table>
        </div>
    </div>
  )
}

export default StudentList