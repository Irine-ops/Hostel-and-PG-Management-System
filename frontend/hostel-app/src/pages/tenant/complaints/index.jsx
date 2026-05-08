import './index.css'
import {Component} from 'react'
import Header from '../../../components/Header'


class Complaints extends Component{

    state = {
        title : '',
        complaintType: '',
        roomNumber: '',
        description: '',
        errorMessage : '',
        complaints : [],
    }

    componentDidMount(){
        this.loadComplaints()
    }

    loadComplaints = async() => {
        const token = localStorage.getItem("jwt_token")
        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            },
            method : "GET",
        }
        const apiUrl = "http://localhost:5000/api/complaint/user"
        const response = await fetch(apiUrl , options)

        const data = await response.json()
        if (response.ok){
            this.setState({
                complaints : data,
            })
        }
    }

    onButtonClick = () => {
        window.location.href = "/view-complaints"
    }


    onChangeTitle = event => {
        this.setState({
            title : event.target.value,
        })
    }

    onChangeDescription = event => {
        this.setState({
            description: event.target.value,
        })
    }

    onChangeType = event => {
        this.setState({
            complaintType : event.target.value,
        })
    }

    onChangeRoomNumber = event => {
        this.setState({
            roomNumber : event.target.value,
        })
    }

    onSubmitComplaint = async event => {
        event.preventDefault()

        let { title, description, complaintType, roomNumber } = this.state
        const token = localStorage.getItem("jwt_token")

        title = title.trim()
        description = description.trim()
        roomNumber = roomNumber.trim()


        if (title === '' || description === '' || complaintType === '' || roomNumber === '') {
            this.setState({ errorMessage: 'All fields are required' })
            return
        }

        if (title.length < 5) {
            this.setState({ errorMessage: 'Title must be at least 5 characters' })
            return
        }

        if (!/^[a-zA-Z0-9\-]+$/.test(roomNumber)) {
            this.setState({ errorMessage: 'Invalid room number format' })
            return
        }

        if (description.length < 10) {
            this.setState({ errorMessage: 'Description must be at least 10 characters' })
            return
        }

        if (description.length > 500) {
            this.setState({ errorMessage: 'Description too long (max 500 characters)' })
            return
        }


        if (!token) {
            this.setState({ errorMessage: 'User not authenticated' })
            return
        }

        try {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({
                    title, description, complaintType, roomNumber
                })
            }

            const response = await fetch('http://localhost:5000/api/complaint', options)
            const data = await response.json()

            if (response.ok) {
                this.setState({
                    title: '',
                    description: '',
                    complaintType: '',
                    roomNumber: '',
                    errorMessage: ''
                })
                alert('Complaint Submitted Successfully!')
            } else {
                this.setState({
                    errorMessage: data.error
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                errorMessage: 'Server Error'
            })
        }
    }

    render(){
        const {title , description , complaintType , roomNumber , errorMessage , complaints} = this.state
        return(
            <div className="dashboard-background-container">
                <Header />
                <div className="complaints-container">
                    <h1 className="title">Complaints</h1>
                    <div className="complaint-form-container">
                        <h2 className="sub-title">Add a New Complaint</h2>
                        <form onSubmit={this.onSubmitComplaint}>
                            <div className="form-label-and-input-item">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" value={title} className="input-item" placeHolder="Enter the title of the complaint" onChange={this.onChangeTitle} id="title" />
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="type" className="form-label">Complaint Type</label>
                                <select value={complaintType} onChange={this.onChangeType} className="input-item">
                                    <option value="">Select Type</option>
                                    <option value="electrical">Electrical</option>
                                    <option value="plumbing">Plumbing</option>
                                    <option value="cleaning">Cleaning</option>
                                    <option value="internet">Internet</option>
                                    <option value="food">Food</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="room-number" className="form-label">Room Number</label>
                                <input type="text" value={roomNumber} className="input-item" onChange={this.onChangeRoomNumber} placeHolder="Enter your room number" id="room-number" />
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea value={description} className="input-item" onChange={this.onChangeDescription} placeHolder="Explain what happened in detail" id="description" />
                            </div>
                            <div className="form-button-container">
                                <button className="button" type="submit">Submit</button>
                                <button className="button" type="button" onClick={this.onButtonClick}>View All Complaints</button>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Complaints;