import './index.css'
import {Component} from 'react'
import Header from '../../../components/Header'

class Menu extends Component{

    state = {
        menu : [],
    }

    componentDidMount(){
        this.loadMenu();
    }

    loadMenu = async () => {
        const token = localStorage.getItem("jwt_token")
        const apiUrl = "http://localhost:5000/api/menu/view-menu"
        const options = {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        const response = await fetch(apiUrl , options);
        const data = await response.json()
        console.log(data);
        this.setState({
            menu : data.menu || data || [], // Ensures it's always an array
        })


    }



    render(){
        const {menu} = this.state;
        const groupedMenu = {};
        menu.forEach(item => {
            if (!groupedMenu[item.day]) {
                groupedMenu[item.day] = {};
            }
            groupedMenu[item.day][item.meal_type] = item.items;
        });
        return(
            <div className="dashboard-background-container">
                <Header />
                <div className="room-details-container">
                    <h1 className="title">Menu Details</h1>
                    <div className="menu-grid">
                    {Object.keys(groupedMenu).map(day => (
                        <div className="menu-day-card" key={day}>
                            <h2 className="day-title">{day}</h2>

                            <div className="meal-container">
                                <div className="meal-box">
                                    <h4>🍳 Breakfast</h4>
                                    <p>{groupedMenu[day].Breakfast || "Not Available"}</p>
                                </div>

                                <div className="meal-box">
                                    <h4>🍛 Lunch</h4>
                                    <p>{groupedMenu[day].Lunch || "Not Available"}</p>
                                </div>

                                <div className="meal-box">
                                    <h4>🍽 Dinner</h4>
                                    <p>{groupedMenu[day].Dinner || "Not Available"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        )
    }

}

export default Menu;