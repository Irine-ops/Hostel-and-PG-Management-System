import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class ContactForm extends Component{

    state = {
        serviceProvider : '',
        taskDescription : '',
        location : '',
        time : '',
        roomNumber : '',
        exactLocation : '',
        showRoom : false,
        errorMessage : '',
    }

    onProviderChange = event => {
        this.setState({
            serviceProvider : event.target.value
        })
    }

    onTaskChange = event => {
        this.setState({
            taskDescription : event.target.value,
        })
    }

    onLocationChange = event => {
        const location = event.target.value;
        this.setState({ 
            location, 
            showRoom: location === "room" 
        });
    }

    onTimeChange = event => {
        this.setState({
            time : event.target.value
        })
    }

    onRoomNumberChange = event => {
        this.setState({
            roomNumber : event.target.value
        })
    }

    onChange = event => {
        this.setState({
            exactLocation : event.target.value,
        })
    }

    onSubmitForm = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("jwt_token")
        const { serviceProvider, taskDescription, location, roomNumber, exactLocation, time} = this.state;

        if (!serviceProvider || !taskDescription || !location || !time) {
            this.setState({ errorMessage: 'Please Fill in the Required Fields' });
            return;
        }


        const taskData = {
            serviceProvider,
            taskDescription,
            location,
            roomNumber,
            exactLocation,
            time
        };

        try {
            const response = await fetch('http://localhost:5000/api/contacts/contact-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization : `Bearer ${token}` },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                alert("Task Submitted!");
                this.setState({
                    serviceProvider : '',
                    taskDescription : '',
                    location : '',
                    roomNumber : '',
                    time : '',
                    exactLocation : '',
                })
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    render(){
        const {serviceProvider , taskDescription , location ,time , showRoom , roomNumber ,exactLocation , errorMessage} = this.state
        return(
            <div className="dashboard-background-container">
                <AdminHeader />
                <div className="room-details-container">
                    <h1 className="title">Contact Form</h1>
                    <div className="complaint-form-container">
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-label-and-input-item">
                            <label htmlFor="stock-name" className="form-label">Service Provider</label>
                            <select value={serviceProvider} className="input-item" onChange={this.onProviderChange}>
                                <option value="">Select Option</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Hostel Warden">Hostel Warden</option>
                                <option value="Security Office">Security Office</option>
                                <option value="Fire Office">Fire Office</option>
                                <option value="Ambulance">Ambulance</option>
                                <option value="Police">Police</option>
                                <option value="Hospital">Nearby Hospital</option>
                            </select>
                        </div>
                        <div className="form-label-and-input-item">
                            <label htmlFor="quantity" className="form-label">Task Description</label>
                            <textarea type="text" value={taskDescription} onChange={this.onTaskChange} className="input-item" id="quantity" />
                        </div>
                        <div className="form-label-and-input-item">
                            <label htmlFor="location" className="form-label">Location</label>
                            <select value={location} className="input-item" onChange={this.onLocationChange}>
                                <option value="">Select Location</option>
                                <option value="room">In The Room</option>
                                <option value="non-room">Outside the Room</option>
                            </select>
                        </div>
                        {showRoom ? ( 
                        <div className="form-label-and-input-item">
                            <label htmlFor="room-number" className="form-label">Room Number</label>
                            <input type="number" value={roomNumber} className="input-item" onChange={this.onRoomNumberChange} id="room-number"/>
                        </div>) : (
                            <div className="form-label-and-input-item">
                                <label htmlFor="exact-location" className="form-label">Mention Exact Location</label>
                                <input type="text" value={exactLocation} className="input-item" onChange={this.onChange} />
                            </div>
                        )}
                        <div className="form-label-and-input-item">
                            <label htmlFor="quantity" className="form-label">Scheduled Time</label>
                            <input type="datetime-local" value={time} onChange={this.onTimeChange} className="input-item" id="quantity" />
                        </div>
                        <div className="buttons-container">
                            <button className="button" type="submit">Submit Task</button>
                        </div>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        )
    }
    
}

export default ContactForm;

