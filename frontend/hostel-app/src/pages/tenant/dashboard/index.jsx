import './index.css'
import {Link} from 'react-router-dom'
import Header from '../../../components/Header'

import {Component} from 'react'

class Dashboard extends Component{

    state = {
        name : '',
    }

    componentDidMount(){
        const name = localStorage.getItem("user_name")
        this.setState({
            name : name,
        })
    }

    render(){
        const {name} = this.state;
        return(
            <div className="dashboard-background-container">
            <Header />
            <div className="dashboard-container">
                <h1 className="welcome-text">Hello {name}</h1>
                <div className="cards-container">
                    <Link to="/room" className="card">
                        <div>
                            <h3>Room Details</h3>
                        </div>
                    </Link>

                    <Link to="/rent-payment" className="card">
                        <div>
                            <h3>Rent Payment</h3>
                        </div>
                    </Link>

                    <Link to="/emergency-contacts" className="card">
                        <div>
                            <h3>Emergency Contacts</h3>
                        </div>
                    </Link>

                    <Link to="/complaints" className="card">
                        <div>
                            <h3>Complaints</h3>
                            <p>Raise Complaint</p>
                        </div>
                    </Link>

                    <Link to="/announcements" className="card">
                        <div>
                            <h3>Announcements</h3>
                        </div>
                    </Link>

                    <Link to="/view-feedback" className="card">
                        <div>
                            <h3>View Feedback</h3>
                        </div>
                    </Link>

                </div>
            </div>
            </div>
        )
    }

}

export default Dashboard