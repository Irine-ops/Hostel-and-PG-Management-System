import './index.css'
import Header from '../../../components/Header'
import {withRouter} from '../../../components/withRouter'
import {Component} from 'react'


class AvailableRooms extends Component{

   state = {
    availableRooms: [],
    errorMessage: '',
    successMessage: '',
    showConfirm: false,
    selectedRoomId: '', 
    startDate: '',      
    endDate: '',   
    isBooked : false,    
}
    
    componentDidMount() {
        const { location } = this.props;
        const preferences = location.state && location.state.preferences;

        if (preferences) {
            this.setState({
                startDate: preferences.startDate,
                endDate: preferences.endDate
            });
            this.fetchFilteredRooms(preferences);
        }
    }

    fetchFilteredRooms = async (preferences) => {
        const {isAC , isSilent , location , roomType , startDate , endDate} = preferences
        const token = localStorage.getItem('jwt_token');
         try {
            const response = await fetch('http://localhost:5000/api/room/search-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    isAC: isAC === '' ? null : parseInt(isAC),
                    isSilent: isSilent === '' ? null : parseInt(isSilent),
                    location: location || null,
                    roomType: roomType || null,
                    startDate,
                    endDate,
                }),
            })
            const data = await response.json()
            if (response.ok) {
                this.setState({ availableRooms: data, errorMessage: '', successMessage: '' })
            } else {
                this.setState({ errorMessage: data.message })
            }
        } catch (err) {
            this.setState({ errorMessage: 'Server Error' })
        }
    }

    onRoomClick = () => {
        window.location.href = "/book-room"
    }
    

    bookRoom = async () => {
        const { selectedRoomId, startDate, endDate } = this.state
        const token = localStorage.getItem('jwt_token')

        if (!selectedRoomId || !startDate || !endDate) {
            this.setState({ errorMessage: 'Select a room and dates' })
            return
        }

        try {
            const response = await fetch('http://localhost:5000/api/room/book-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ roomId: selectedRoomId, startDate, endDate }),
            })
            const data = await response.json()
            if (response.ok) {
                this.setState({
                    successMessage: data.message,
                    errorMessage: '',
                    selectedRoomId: '',
                    startDate: '',
                    endDate: '',
                    availableRooms: [],
                    showConfirm : false,
                    isBooked : true,
                })
            } else {
                this.setState({ errorMessage: data.message, successMessage: '' })
            }
        } catch (err) {
            this.setState({ errorMessage: 'Server Error', successMessage: '' })
        }
    }


    render(){
        const { availableRooms, selectedRoomId, showConfirm, errorMessage, successMessage } = this.state;
        const roomsWithVacancy = availableRooms.filter(
            room => (room.capacity - room.current_occupancy) > 0
        );
        return(
            <div className="available-rooms-background-container">
                <Header />
                <div className="available-rooms-container">
                    <h1 className="title">Available Rooms</h1>

                {this.state.isBooked ? (
                    <div className="room-details-card congratulations-card">
                        <h1 className="title center-text">Congratulations !! Your Room has been Booked! Thank You!!</h1>
                    </div>
                ) : roomsWithVacancy.length > 0 ? (
                    <div className="available-rooms">
                        <div className="table-container">
                            <table className="rooms-table">
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Room Number</th>
                                        <th>Type</th>
                                        <th>AC</th>
                                        <th>Silent</th>
                                        <th>Location</th>
                                        <th>Rent</th>
                                        <th>Vacancy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomsWithVacancy.map(room => (
                                        <tr key={room.room_id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    name="selectedRoom"
                                                    value={room.room_id}
                                                    checked={selectedRoomId === room.room_id}
                                                    onChange={e => this.setState({ selectedRoomId: Number(e.target.value) })}
                                                />
                                            </td>
                                            <td>{room.room_number}</td>
                                            <td>{room.room_type}</td>
                                            <td>{room.is_ac ? 'Yes' : 'No'}</td>
                                            <td>{room.is_silent_room ? 'Yes' : 'No'}</td>
                                            <td>{room.location}</td>
                                            <td>{room.rent_amount}</td>
                                            <td>{room.capacity - room.current_occupancy}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="login-button-container">
                            <button className="button" type="button" onClick={this.bookRoom}>Book Selected Room</button>
                        </div>
                    </div>
                ) : (
                    <div className="room-details-card">
                        <h1 className="title center-text">No Rooms Found. Try Again</h1>
                        <div className="buttons-container">
                            <button className="button" onClick={this.onRoomClick}>Back to Search</button>
                        </div>
                    </div>
                )}
                </div>
            </div>
        )
    }

}


export default withRouter(AvailableRooms);
