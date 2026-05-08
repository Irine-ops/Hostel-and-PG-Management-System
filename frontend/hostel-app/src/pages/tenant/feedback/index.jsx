import './index.css'
import {Component} from 'react'
import Header from './../../../components/Header'


class Feedback extends Component{

    state = {
        name : '',
        rating: '',
        message: '',
        errorMessage: '',
    }

    onButtonClick = () => {
        window.location.href = "/view-feedback"
    }

    onChangeName = event => {
        this.setState({
            name : event.target.value,
            errorMessage : '',
        })
    }

    onChangeMessage = event => {
        this.setState({
            message : event.target.value,
            errorMessage : '',
        })
    }

    onChangeRating = event => {
        this.setState({
            rating : event.target.value,
            errorMessage : '',
        })
    }

    onSubmitFeedback = async event => {
        event.preventDefault();

        let {name, rating, message} = this.state
        const token = localStorage.getItem("jwt_token")

        name = name.trim()
        message = message.trim()

        // Validation
        if (name === '' || rating === '' || message === '') {
            this.setState({ errorMessage: "All fields are required" })
            return
        }

        if (name.length < 3) {
            this.setState({ errorMessage: "Name must be at least 3 characters" })
            return
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            this.setState({ errorMessage: "Name should contain only letters" })
            return
        }

        if (Number(rating) < 1 || Number(rating) > 5) {
            this.setState({ errorMessage: "Invalid rating selected" })
            return
        }

        if (message.length < 10) {
            this.setState({ errorMessage: "Message must be at least 10 characters" })
            return
        }

        if (message.length > 300) {
            this.setState({ errorMessage: "Message should not exceed 300 characters" })
            return
        }

        if (!token) {
            this.setState({ errorMessage: "User not authenticated" })
            return
        }

        try {
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({ name, rating, message })
            }

            const response = await fetch('http://localhost:5000/api/feedback', options)
            const data = await response.json()

            if (response.ok) {
                this.setState({
                    name: '',
                    rating: '',
                    message: '',
                    errorMessage: ''
                })
                alert("Feedback submitted successfully")
            } else {
                this.setState({ errorMessage: data.error })
            }
        } catch (error) {
            console.log(error)
            this.setState({ errorMessage: 'Server Error' })
        }
    }

    render(){
        const {name , rating , message , roomNumber , errorMessage} = this.state
        return(
            <div className="dashboard-background-container">
                <Header />
                <div className="complaints-container">
                    <h1 className="title">Feedback</h1>
                    <div className="complaint-form-container">
                        <h2 className="sub-title">Enter the feedback</h2>
                        <form onSubmit={this.onSubmitFeedback}>
                            <div className="form-label-and-input-item">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" value={name} className="input-item" onChange={this.onChangeName} placeHolder="Enter your name" id="name" />
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="rating" className="form-label">Rating</label>
                                <select value={rating} onChange={this.onChangeRating} className="input-item" id="rating">
                                    <option value="">Select Type</option>
                                    <option value="1">1 - Very Bad</option>
                                    <option value="2">2 - Bad</option>
                                    <option value="3">3 - Average</option>
                                    <option value="4">4 - Good</option>
                                    <option value="5">5 - Very Good</option>
                                </select>
                            </div>
                            <div className="form-label-and-input-item">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea value={message} className="input-item" onChange={this.onChangeMessage} placeHolder="How was your stay experience ?" id="message" />
                            </div>
                            <div className="form-button-container">
                                <button className="button" type="submit">Submit</button>
                                <button className="button" type="button" onClick={this.onButtonClick}>View All Feedback</button>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Feedback;