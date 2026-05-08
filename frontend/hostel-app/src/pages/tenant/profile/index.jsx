import './index.css'
import {Component} from 'react'
import Header from '../../../components/Header'
import { Link } from 'react-router-dom'

class Profile extends Component{

    state = {
        profile : {},
    }

    componentDidMount(){
        this.loadProfile()
    }

    loadProfile = async() => {
        const token = localStorage.getItem("jwt_token")
        const userId = localStorage.getItem("userId")
        const apiUrl = 'http://localhost:5000/api/profile/get-user'

        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            }, 
            method : "GET",
        }

        const response = await fetch(apiUrl , options)
        const data = await response.json()
        this.setState({
            profile : data,
        })

    }

    render(){
        const {profile} = this.state;
        return(
            <div className="profile-background-container">
                <Header />
                <div className="profile-container">
                    <h2>Profile</h2>
                    <div className="profile-details-card">
                        <p className="profile-item">Name : {profile.name}</p>
                        <p className="profile-item">Email: {profile.email}</p>
                        <p className="profile-item">Phone: {profile.phone_no}</p>
                        <p className="profile-item">Room Number: {profile.room_number || "Not assigned"}</p>
                    </div>
                    <div className="buttons-container">
                        <button className="button" type="button">
                            <Link to="/update-profile" className="button-link">Update Profile</Link>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Profile