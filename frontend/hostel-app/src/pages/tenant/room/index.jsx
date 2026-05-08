import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../../../components/Header'

import singleImage from './single-room.png'
import doubleImage from './double-sharing-room.jpg'
import tripleImage from './triple-sharing-room.jpg'

class Room extends Component{

    state = {
        roomDetails : {},
    }

    componentDidMount(){
        this.loadRoomDetails()
    }

    loadRoomDetails = async () => {
        try {
            const token = localStorage.getItem("jwt_token");
            const apiUrl = "http://localhost:5000/api/room/get/room";

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await fetch(apiUrl, options);

            if (!response.ok) {
            // This will catch 401, 403, 404, 500 etc.
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.setState({ roomDetails: data });
        } catch (error) {
            console.error("Failed to load room details:", error);
            this.setState({ roomDetails: {} }); 
        }
    };

    renderRoomImage = () => {
        const { roomDetails } = this.state;
        const roomType = roomDetails.room_type?.toLowerCase() || "";

        if (roomType.includes("single")) {
            return <img src={singleImage} alt="Single Room" className="room-image" />;
        } else if (roomType.includes("double")) {
            return <img src={doubleImage} alt="Double Sharing Room" className="room-image" />;
        } else if (roomType.includes("triple")) {
            return <img src={tripleImage} alt="Triple Sharing Room" className="room-image" />;
        }
        return null; // Render nothing if no match
    };

    render(){
        const {roomDetails} = this.state
        return(
            <div className="room-background-container">
                <Header />
                <div className="room-details-container">
                    <h1 className="title">Room Details</h1>
                    <div className="room-details-card">
                        {roomDetails.room_number ? (
                        <div className="card-text-and-image-container">
                        <div className="text-container">
                            <p className="room-detail">Room Number : {roomDetails.room_number}</p>
                            <p className="room-detail">Room Type : {roomDetails.room_type}</p>
                            <p className="room-detail">Floor : {roomDetails.location}</p>
                            <p className="room-detail">Monthly Rent : Rs. {roomDetails.rent_amount}</p>
                            <p className="room-detail">Check In Date : {roomDetails.checkInDate ? new Date(roomDetails.checkInDate).toLocaleDateString() : "N/A"}</p>
                            <ul className="room-detail"> Roomates : 
                                {roomDetails.roommates && roomDetails.roommates.length > 0 ? roomDetails.roommates.map((mate , i) => (
                                    <li key={i} className="room-detail list-item">{mate}</li>
                                )) : " No Roomates"}
                            </ul>
                        </div>
                        <div className="image-container">
                            {this.renderRoomImage()}                            
                        </div>
                        </div>) : (
                            <>
                                <h1 className="title center-text">
                                    No Room Found
                                </h1>
                            </>
                        )}
                    </div>
                    <div className="buttons-container">
                        {!roomDetails.room_number && <button className="button" type="button">
                            <Link to="/book-room" className="button-link">Book a Room </Link>
                        </button>}
                    </div>
                </div>
            </div>
        )
    }
}


export default Room;