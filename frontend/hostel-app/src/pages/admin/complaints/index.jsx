import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class AdminComplaints extends Component{
    state = {
        complaints: []
    }

  componentDidMount() {
    this.loadComplaints()
  }

  loadComplaints = async() => {
    const apiUrl = "http://localhost:5000/api/admin/complaints"
    const token = localStorage.getItem("jwt_token")
    const options = {
      headers : {
        Authorization : `Bearer ${token}`
      }, 
      method : "POST"
    }

    const response = await fetch(apiUrl , options)
    const data = await response.json()

    console.log("Complaints : " , data)

    this.setState({
      complaints : data,
    })
  }

  resolveComplaints = async(id) => {
    const token = localStorage.getItem("jwt_token")
    const apiUrl = `http://localhost:5000/api/complaint/${id}/resolve`
    const options = {
      headers : {
        Authorization : `Bearer ${token}`
      },
      method : "PUT"
    }

    const response = await fetch(apiUrl , options);
    const data = await response.json()

    this.loadComplaints()

  }

  deleteComplaints = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this complaint?")
    if (!confirmDelete) return
    
    const token = localStorage.getItem("jwt_token")
    const options = {
      headers : {
        Authorization : `Bearer ${token}`
      },
      method :"DELETE"
    }

    const apiUrl = `http://localhost:5000/api/complaint/${id}`
    
    const response = await fetch(apiUrl , options)
    const data = await response.json()

    this.loadComplaints()
  }

  render() {
    const {complaints} = this.state

    return (
      <div className="complaints-background-container">
        <AdminHeader />
        <div className="tenants-container">
            <h1 className="title">Manage Complaints</h1>
            <table className="table-container">
              <thead>
                <tr className="t-ros">
                    <th className="table-rows">Title</th>
                    <th className="table-rows">Content</th>
                    <th className="table-rows">Complaint Type</th>
                    <th className="table-rows">Name of the User</th>
                    <th className="table-rows">Status</th>
                    <th className="table-rows">Priority</th>
                    <th>Action</th>
                </tr>
              </thead>
            
              <tbody>
                {complaints.map(each => (
                    <tr key={each.complaint_id} className={each.priority == "High" ? "priority-high" : each.priority == "Medium" ? "priority-medium" : "priority-low"}>
                      <td className="table-row-item">{each.complaint_title}</td>
                      <td className="table-row-item">{each.complaint_content}</td>
                      <td className="table-row-item">{each.complaint_type}</td>
                      <td className="table-row-item">{each.name}</td>
                      <td className="table-row-item">{each.status || "Pending"}</td>

                      <td className="table-row-item">
                        <span className={`priority priority-${each.priority?.toLowerCase()}`}>
                          {each.priority || "Low"}
                        </span>
                      </td>
                      
                      <td>
                        <div className="buttons-container">
                          <button className="button resolve-btn" type="button" onClick={() => this.resolveComplaints(each.complaint_id)}>Resolve</button>
                          <button className="button delete-btn" type="button" onClick={() => this.deleteComplaints(each.complaint_id)}>Delete</button>
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

export default AdminComplaints;