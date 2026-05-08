import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class AddRoom extends Component{

    state = {
        roomNumber : '',
        roomType : '',
        silent : '',
        ac : '',
        location : '',
        rentAmount : '',
        capacity : '',
    }

    onRoomNumberChange = event => {
        const roomNumber = event.target.value;
        const firstDigit = roomNumber[0]

        if (firstDigit == "1"){
            this.setState({
                location : "First Floor",
                roomNumber : roomNumber,
            })
        }
        else if (firstDigit == "2"){
            this.setState({
                location : "Second Floor",
                roomNumber : roomNumber,
            })
        }
        else if (firstDigit == "3"){
            this.setState({
                location : "Third Floor",
                roomNumber : roomNumber,
            })
        }
    }

    onRoomTypeChange = event => {
        const roomType = event.target.value;

        if (roomType == "Single"){
            this.setState({
                capacity : 1,
                roomType : roomType,
            })
        }
        else if (roomType == "Double Sharing"){
            this.setState({
                capacity : 2,
                roomType : roomType,
            })
        }
        else if (roomType == "Triple Sharing"){
            this.setState({
                capacity : 3,
                roomType : roomType,
            })
        }
    }
    
    onSilentChange = event => {
        this.setState({
            silent : event.target.value,
        })
    }

    onAcChange = event => {
        this.setState({
            ac : event.target.value,
        })
    }

    onRentAmountChange = event => {
        this.setState({
            rentAmount : event.target.value,
        })
    }

    onLocationChange = event => {
        const location = event.target.value;

        if (location == "First Floor"){
            this.setState({
                roomNumber : 1,
                location : location,
            })
        }
        else if (location == "Second Floor"){
            this.setState({
                roomNumber : 2,
                location : location,
            })
        }
        else if (location == "Third Floor"){
            this.setState({
                roomNumber : 3,
                location : location,
            })
        }
    }

    onCapacityChange = event => {
        this.setState({
            capacity : event.target.value,
        })
    }

    onSubmitForm = async (event) => {
        event.preventDefault()
        const {roomNumber , roomType , ac , silent , location , capacity , rentAmount} = this.state
        try {
            const token = localStorage.getItem("jwt_token");

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    roomNumber : roomNumber,
                    roomType : roomType,
                    silent : silent,
                    ac : ac,
                    location : location,
                    rentAmount : rentAmount,
                    capacity : capacity
                })
            };

            const apiUrl = "http://localhost:5000/api/room/add-room";

            const response = await fetch(apiUrl, options);
            const data = await response.json();

            if (response.ok) {
                alert("Room Added Successfully!!!")
                this.setState({
                    roomType : '',
                    silent : '',
                    ac : '',
                    location : '',
                    rentAmount : '',
                    capacity : ''
                })
                console.log("Success:", data.message);
            } else {
                console.log("Error:", data.message);
            }

        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };


    render(){
        const {roomNumber , roomType , silent , ac , location , rentAmount , capacity} = this.state
        return(
            <div className="dashboard-background-container">
                <AdminHeader />
                <div className="room-details-container">
                    <h1 className="title">Add a Room</h1>
                    <div className="complaint-form-container">
                        <form onSubmit={this.onSubmitForm}>
                            <div className="form-label-and-input-item">
                                <label htmlFor="room-number" className="form-label">Room Number</label>
                                <input type="text" value={roomNumber} onChange={this.onRoomNumberChange} className="input-item" id="room-number" />
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="room-type" className="form-label">Room Type</label>
                                <select value={roomType} className="input-item" onChange={this.onRoomTypeChange}>
                                    <option value="">Select Type</option>
                                    <option value="Single">Single</option>
                                    <option value="Double Sharing">Double Sharing</option>
                                    <option value="Triple Sharing">Triple Sharing</option>
                                </select>
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="silent" className="form-label">Is the Room Silent ?</label>
                                <select value={silent} className="input-item" onChange={this.onSilentChange}>
                                    <option value="">Select Option</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="AC" className="form-label">Has AC ?</label>
                                <select value={ac} className="input-item" onChange={this.onAcChange}>
                                    <option value="">Select Option</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="location" className="form-label">Which Floor ?</label>
                                <select value={location} className="input-item" onChange={this.onLocationChange}>
                                    <option value="">Select the Floor</option>
                                    <option value="First Floor">First Floor</option>
                                    <option value="Second Floor">Second Floor</option>
                                    <option value="Third Floor">Third Floor</option>
                                </select>
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="rent-amount" className="form-label">Rent Amount</label>
                                <input type="number" value={rentAmount} onChange={this.onRentAmountChange} className="input-item" id="rent-amount" />
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="capacity" className="form-label">Capacity</label>
                                <input type="number" value={capacity} onChange={this.onCapacityChange} className="input-item" id="capacity" />
                            </div>
                            <div className="buttons-container">
                                <button className="button" type="submit">Add The Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddRoom;
