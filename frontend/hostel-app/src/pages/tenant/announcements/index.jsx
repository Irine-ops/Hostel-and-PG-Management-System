import './index.css'
import {Component} from 'react'
import Header from '../../../components/Header'

class Announcement extends Component{

    state = {
        announcements : [],
    }

    componentDidMount(){
        this.loadAnnouncements()
    }

    loadAnnouncements = async() => {
        const token = localStorage.getItem("jwt_token")
        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            },
            method : "GET",
        }
        const apiUrl = "http://localhost:5000/api/announcements/get-announcement"
        const response = await fetch(apiUrl, options)
        const data = await response.json()

        if(response.ok){
            this.setState({
                announcements : data,
            })
        }
    }



    render(){
        const {announcements} = this.state
        return(
            <div className="dashboard-background-container">
                <Header />
                <div className="room-details-container">
                    <h1 className="title">Announcements</h1>
                    <div className="announcement-cards-container">
                        {announcements.map(announcement => (
                            <div className="announcement-details-card">
                                <h2 className="title">{announcement.title}</h2>
                                <p className="announcement-description">{announcement.content}</p>
                                <small>
                                    {announcement.name} • {new Date(announcement.created_at).toLocaleDateString()}
                                </small>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

}


export default Announcement;