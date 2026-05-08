import './index.css'
import {Link} from 'react-router-dom'
import logo from '../Header/logo.png'

const AdminHeader = () => {
    const onButtonClick = () => {
        localStorage.removeItem("jwt_token");
        window.location.replace("/")
    }
    return (
        <div className="header-container">
            <div className="logo-container">
                <img src={logo} alt="image" className="logo-image"/>
            </div>
            <div className="link-items-container">
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/profile">Tenants</Link>
                <Link to="/admin/rooms">Rooms</Link>
                <Link to="/admin/complaints">Complaints</Link>
                <Link to="/admin/feedback">Feedback</Link>
                <Link to="/admin/attendance">Attendance</Link>
            </div>
            <div className="header-button-container">
                <button type="button" className="button" onClick={onButtonClick}>Log Out</button>
            </div>
        </div>
    )
}

export default AdminHeader;
