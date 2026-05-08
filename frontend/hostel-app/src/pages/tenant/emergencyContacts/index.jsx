import './index.css'
import {Component} from 'react'
import Header from '../../../components/Header'

class EmergencyContacts extends Component{

    state = {
        contacts : [],
    }

    componentDidMount(){
        this.loadContacts()
    }

    loadContacts = async () => {
        try {
            const token = localStorage.getItem("jwt_token")
            const apiUrl = "http://localhost:5000/api/tenants/contacts"

            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "GET"
            }

            const response = await fetch(apiUrl, options)
            const data = await response.json()

            if (response.ok) {
                this.setState({ contacts: data })
            } else {
                console.log("Failed to fetch contacts")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    render(){
        const {contacts} = this.state;
        return(
            <div className="complaints-background-container">
                <Header />
                <div className="complaints-container">
                    <h1 className="title">Emergency Contacts</h1>
                    <div className="cards-container">
                        <>
                        {contacts.map(eachContact => (
                            <div className="emergency-card text-center" key={eachContact.id}>
                                <p className="room-detail">{eachContact.name}</p>
                                <p className="room-detail">{eachContact.phone}</p>
                            </div>
                        ))}
                        </>
                    </div>
                </div>
            </div>
        )
    }

}

export default EmergencyContacts;

