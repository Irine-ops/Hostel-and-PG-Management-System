import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class Attendance extends Component{

    state = {
        attendance : [],
    }

    componentDidMount(){
        this.loadAttendance()
    }

    loadAttendance = async() => {
        const token = localStorage.getItem("jwt_token")
        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            },
            method : "GET",
        }

        const apiUrl = "http://localhost:5000/api/attendance/get-attendance"
        
        const response = await fetch(apiUrl , options)
        const data = await response.json()

        this.setState({
            attendance : data,
        })
    }

    markAttendance = async (userId, status) => {
        const token = localStorage.getItem("jwt_token")

        await fetch("http://localhost:5000/api/attendance/update-attendance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: userId,
                status: status
            })
        })
        this.loadAttendance()
    }


    render(){
        const {attendance} = this.state
        return(
            <div className="attendance-background-container">
                <AdminHeader />
                <div className="tenants-container">
                    <h1 className="title">Manage Attendance</h1>
                    <table className="table-container">
                    <thead>
                        <tr className="t-ros">
                            <th className="table-rows">Name</th>
                            <th className="table-rows">Status</th>
                            <th className="table-rows">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {attendance.map(each => (
                        <tr key={each.user_id}>
                            <td className="table-row-item">{each.name}</td>
                            <td className="table-row-item">
                                <span 
                                    className={`status-badge ${each.status === "Present" ? "present" : each.status === "Absent" ? "absent" : "not-marked"}`}
                                >
                                    {each.status || "Not Marked"}
                                </span>
                            </td>
                            <td className="table-row-item">
                                <div className="table-buttons-container">
                                    <button className="table-button" type="button" onClick={() => this.markAttendance(each.user_id , "Present")} disabled={each.status === "Present"}>Present</button>
                                    <button className="table-button" type="button" onClick={() => this.markAttendance(each.user_id , "Absent")} disabled={each.status === "Absent"}>Absent</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default Attendance