import './index.css'
import logo from '../Header/logo.png'
import {Link} from 'react-router-dom'

const Header = () => {
    const onButtonClick = () => {
        localStorage.removeItem("jwt_token");
        window.location.replace("/")
    }

    const onManageClick = () => {
        window.location.replace("/profile")
    }

    return (
        <div className="header-container">
            <div className="logo-container">
                <img src={logo} alt="image" className="logo-image"/>
            </div>
            <div className="link-items-container">
                <Link to="/dashboard">Home</Link>
                <Link to="/room">Room</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/complaints">Complaints</Link>
                <Link to="/feedback">Feedback</Link>
            </div>
            <div className="header-button-container">
                <button type="button" className="button" onClick={onManageClick}>Manage Profile</button>
                <button type="button" className="button" onClick={onButtonClick}>Log Out</button>
            </div>
        </div>
    )
}

export default Header;
