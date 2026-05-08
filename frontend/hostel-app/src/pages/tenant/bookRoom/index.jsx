import './index.css'
import {Component} from 'react'
import {withRouter} from '../../../components/withRouter'
import Header from '../../../components/Header'


class BookRoom extends Component{
    state = {
        isAC: '',
        isSilent: '',
        location: '',
        roomType: '',
        availableRooms: [],
        selectedRoomId: '',
        startDate: '',
        endDate: '',
        errorMessage: '',
        successMessage: '',
        showConfirm : false,
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }


    searchRooms = (event) => {
        event.preventDefault();
        const { isAC, isSilent, location, roomType, startDate, endDate } = this.state;

        if (!startDate || !endDate) {
            this.setState({ errorMessage: 'Please select both Start and End dates' });
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            this.setState({ errorMessage: 'End date must be after Start date' });
            return;
        }

        const preferences = { isAC, isSilent, location, roomType, startDate, endDate };

        this.props.navigate('/available-rooms', { state: { preferences } });
    }


    render() {
        const {
            isAC,
            isSilent,
            location,
            roomType,
            availableRooms,
            selectedRoomId,
            startDate,
            endDate,
            errorMessage,
            successMessage,
        } = this.state

        const today = new Date().toISOString().split('T')[0];

        return (
            <div className="dashboard-background-container">
                <Header />
                <div className="booking-container">
                    <h1 className="title">Book a Room</h1>

                    <div className="preferences-form">
                        <h2 className="sub-title">Select Preferences</h2>
                        <form onSubmit={this.searchRooms} className="form">
                        <div className="form-row">
                            <div className="form-item">
                                <label className="label">Would you like to have AC in your Room ?</label>
                                <select name="isAC" value={isAC} onChange={this.handleChange} className="select">
                                    <option value="">Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            
                            <div className="form-item">
                                <label className="label">Silent Room:</label>
                                <select name="isSilent" value={isSilent} onChange={this.handleChange} className="input-item">
                                    <option value="">Select</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                            
                            <div className="form-item">
                                <label className="label">Floor:</label>
                                <select name="location" value={location} onChange={this.handleChange} className="input-item">
                                    <option value="">Select</option>
                                    <option value="First Floor">First Floor</option>
                                    <option value="Second Floor">Second Floor</option>
                                    <option value="Third Floor">Third Floor</option>
                                </select>
                            </div>
                            
                            <div className="form-item">
                                <label className="label">Room Type:</label>
                                <select name="roomType" value={roomType} onChange={this.handleChange} className="input-item select">
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Double Sharing">Double Sharing</option>
                                    <option value="Triple Sharing">Triple Sharing</option>
                                </select>
                            </div>

                            <div className="form-item">
                                <label className="label">Start Date:</label>
                                <input type="date" value={startDate} min={today} onChange={e => this.setState({ startDate: e.target.value })} className="input-item" />
                            </div>
                            
                            <div className="form-item">
                                <label className="label">End Date:</label>
                                <input type="date" value={endDate} min={startDate || today} onChange={e => this.setState({ endDate: e.target.value })} className="input-item" />
                            </div>
                        </div>
                        <div className="login-button-container">
                            <button className="book-button" type="submit">Search Rooms</button>
                        </div>
                        </form>
                    </div>


                    <div className="messages-container">
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>

                </div>
            </div>
        )
    }
}




export default withRouter(BookRoom);