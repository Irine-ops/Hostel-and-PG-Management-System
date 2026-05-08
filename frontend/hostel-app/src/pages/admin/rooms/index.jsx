import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'

class AdminRooms extends Component{
    state = {
        rooms: []
    }

  componentDidMount() {
    this.loadRooms()
  }

  loadRooms = async() => {
    const apiUrl = "http://localhost:5000/api/admin/rooms"
    const token = localStorage.getItem("jwt_token")
    const options = {
      headers : {
        Authorization : `Bearer ${token}`
      }, 
      method : "POST"
    }

    const response = await fetch(apiUrl , options)
    const data = await response.json()

    console.log("Rooms : " , data)

    this.setState({
      rooms : data,
    })
  }

  deleteRoom = async(id) => {
    const token = localStorage.getItem("jwt_token")
    const options = {
      headers : {
        Authorization : `Bearer ${token}`,
      },
      method : "DELETE",
    }

    const apiUrl = `http://localhost:5000/api/room/delete/${id}`
    const response = await fetch(apiUrl , options)
    const data = await response.json()

    if (response.ok){
      alert("Room Deleted Successfully")
      this.loadRooms()
    }
    else{
      alert("Room Can't be deleted!! , Please tell the tenants to vacate the rooms before deleting that room")
      this.loadRooms()
    }
  }

  render() {
    const {rooms} = this.state

    return (
      <div className="rooms-background-container">
        <AdminHeader />
        <div className="tenants-container">
            <h1 className="title">Manage Rooms</h1>
            <table className="table-container">
              <thead>
                <tr className="t-ros">
                    <th className="table-rows">Room Number</th>
                    <th className="table-rows">Room type</th>
                    <th className="table-rows">Is Ac</th>
                    <th className="table-rows">Is Silent Room</th>
                    <th className="table-rows">Location</th>
                    <th className="table-rows">Capacity</th>
                    <th className="table-rows">Current Occupancy</th>
                    <th className="table-rows">Rent Amount</th>
                    <th className="table-rows">Action</th>
                </tr>
              </thead>
            
              <tbody>
                {rooms.map(each => (
                    <tr key={each.room_id}>
                        <td className="table-row-item">{each.room_number}</td>
                        <td className="table-row-item">{each.room_type}</td>
                        <td className="table-row-item">{each.is_ac ? "Yes" : "No"}</td>
                        <td className="table-row-item">{each.is_silent_room ? "Yes" : "No"}</td>
                        <td className="table-row-item">{each.location}</td>
                        <td className="table-row-item">{each.capacity}</td>
                        <td className="table-row-item">{each.current_occupancy}</td>
                        <td className="table-row-item">₹{each.rent_amount}</td>
                        <td className="table-row-item">
                          <button className="button" type="button" onClick={() => this.deleteRoom(each.room_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
            <div className="buttons-container">
              <button className="button" type="button">
                <Link to="/add-room" className="button-link">Add a Room</Link>
              </button>
            </div>
        </div>
      </div>
    )
  }   
}

export default AdminRooms;