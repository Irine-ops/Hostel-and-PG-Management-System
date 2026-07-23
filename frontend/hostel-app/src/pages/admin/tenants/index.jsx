import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class Tenants extends Component {
  state = {
    tenants: []
  }

  componentDidMount() {
    this.loadTenants()
  }

  loadTenants = async() => {
    const apiUrl = "http://localhost:5000/api/admin/tenants"
    const token = localStorage.getItem("jwt_token")
    const options = {
      headers : {
        Authorization : `Bearer ${token}`
      }, 
      method : "POST"
    }

    const response = await fetch(apiUrl , options)
    const data = await response.json()

    console.log("Tenants : " , data)

    this.setState({
      tenants : data,
    })
  }


  deleteTenants = async(id) => {
    if (!window.confirm("Are you sure you want to delete this tenant?")) return;

    const token = localStorage.getItem("jwt_token")
    const options = {
      headers : {
        Authorization : `Bearer ${token}`,
      },
      method : "DELETE",
    }
    const apiUrl = `http://localhost:5000/api/tenants/delete/${id}`

    const response = await fetch(apiUrl , options)
    const data = await response.json()

    if (response.ok){
      alert(data.message || "Deleted Successfully")
      this.loadTenants();
    }
    else{
      alert(data.error || "Failed to delete tenant")
    }
  }

  render() {
    const {tenants} = this.state
    return (
      <div className="dashboard-background-container">
        <AdminHeader />
        <div className="tenants-container">
            <h1 className="title">Manage Tenants</h1>
            <table className="table-container">
              <thead>
                <tr className="t-ros">
                    <th className="table-rows">Name</th>
                    <th className="table-rows">Phone</th>
                    <th className="table-rows">Room</th>
                    <th className="table-rows">Action</th>
                </tr>
              </thead>
            
              <tbody>
                {tenants.map(each => (
                    <tr key={each.user_id}>
                      <td className="table-row-item">{each.name}</td>
                      <td className="table-row-item">{each.phone_no}</td>
                      <td className="table-row-item">{each.room_number || "Not Assigned"}</td>
                      <td className="table-row-item">
                        <button className="button" type="button" onClick={() => this.deleteTenants(each.user_id)}>Delete</button>
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

export default Tenants;