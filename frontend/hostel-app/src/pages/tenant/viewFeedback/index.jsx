import './index.css'
import Header from '../../../components/Header'
import {Component} from 'react'

class ViewFeedback extends Component{

    state = {
        feedback : [],
    }

    componentDidMount(){
        this.loadFeedback()
    }

    loadFeedback = async() => {
        const apiUrl = "http://localhost:5000/api/admin/feedback"
        const token = localStorage.getItem("jwt_token")
        const options = {
        headers : {
            Authorization : `Bearer ${token}`
        }, 
        method : "GET"
        }

        const response = await fetch(apiUrl , options)
        const data = await response.json()

        console.log("Feedback : " , data)

        this.setState({
            feedback : data,
        })
    }

    render(){
        const {feedback} = this.state
        return(
            <div className="dashboard-background-container">
                <Header />
                <div className="view-feedback-container">
                    <h1 className="title">View Feedback</h1>
                    <table className="table-container feedback-table-container">
                        <thead>
                            <tr className="t-ros table-header">
                                <th className="table-rows">Rating</th>
                                <th className="table-rows">Content</th>
                                <th className="table-rows">Name of the User</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {feedback.map(each => (
                                <tr key={each.feedback_id}>
                                <td className="table-row-item">{each.rating}</td>
                                <td className="table-row-item">{each.feedback_content}</td>
                                <td className="table-row-item">{each.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}


export default ViewFeedback;
