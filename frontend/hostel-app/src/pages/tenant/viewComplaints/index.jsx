import './index.css'
import {Component} from 'react'
import Header from '../../../components/Header'

class ViewComplaints extends Component{

    state = {
        complaints : []
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


    render(){
        const {complaints} = this.state
        return(
            <div className="feedback-background-container">
                <Header />
                <div className="complaints-container">
                    <h1 className="title">My Complaints</h1>
                    {complaints.length > 0 ? (
                        <ul className="announcement-cards-container">
                            {complaints.map(eachComplaint => (
                                <li key={eachComplaint.complaint_id} className="room-details-card">
                                    <h2 className="title">{eachComplaint.complaint_title}</h2>
                                    <p className="description">{eachComplaint.complaint_content}</p>
                                    <p className="description">Status : {eachComplaint.status}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="room-details-card">
                            <h1 className="title text-center">No Complaints Found</h1>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}

export default ViewComplaints;
