import './index.css'
import {Link} from 'react-router-dom'
import AdminHeader from '../../../components/AdminHeader'

import {Component} from 'react'

class AdminDashboard extends Component{

    state = {
        name : ''
    }

    componentDidMount(){
        const name = localStorage.getItem("user_name");
        this.setState({
            name : name,
        })
    }

    render(){
        const {name} = this.state
        return(
            <div className="dashboard-background-container">
            <AdminHeader />
            <div className="dashboard-container">
                <h1 className="title">Hello {name}</h1>
                <div className="cards-container">
                    <Link to="/admin/profile" className="card">
                        <div>
                            <h3>Total Tenants</h3>
                        </div>
                    </Link>

                    <Link to="/admin/stock-management" className="card">
                        <div>
                            <h3>Stock Management</h3>
                        </div>
                    </Link>

                    <Link to="/admin/complaints" className="card">
                    <div>
                        <h3>Complaints</h3>
                    </div>
                    </Link>

                    <Link to="/admin/fee-payment" className="card">
                    <div>
                        <h3>Fee Payments</h3>
                    </div>
                    </Link>

                    <Link to="/admin/feedback" className="card">
                    <div>
                        <h3>Feedback</h3>
                    </div>
                    </Link>

                    <Link to="/admin/announcements" className="card">
                    <div>
                        <h3>Announcements</h3>
                    </div>
                    </Link>

                    <Link to="/admin/contacts" className="card">
                        <div>
                            <h3>Contacts</h3>
                        </div>
                    </Link>

                    <Link to="/admin/stock-help" className="card">
                        <div>
                            <h3>Stock Support</h3>
                        </div>
                    </Link>

                </div>
            </div>
            </div>
        )
    }

}

export default AdminDashboard