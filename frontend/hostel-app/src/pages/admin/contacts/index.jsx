import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader';
import image from './user-icon.jpg'

class Contacts extends Component{

    state = {
        contacts : []
    }

    componentDidMount(){
        this.loadContacts()
    }

    loadContacts = async() => {
        const apiUrl = "http://localhost:5000/api/contacts/all-contacts"
        const token = localStorage.getItem("jwt_token")

        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            },
            method : "GET",
        }

        const response = await fetch(apiUrl , options)
        const data = await response.json()

        if (response.ok){
            this.setState({
                contacts : data,
            })
        }
    }

    onButtonClick = () => [
        window.location.href = "/admin/contacts/contact-form"
    ]

    render(){
        const {contacts} = this.state;
        return(
            <div className="dashboard-background-container">
                <AdminHeader />
                <div className="contacts-container">
                    <h1 className="title">Contacts</h1>
                    <div className="cards-container">
                        {contacts.map(eachContact => (
                            <button className="contact-card contact-button" key={eachContact.id} onClick={this.onButtonClick}>
                                <img src={image} className="image" alt="logo-image" />
                                <p className="card-description">{eachContact.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

}

export default Contacts;

