import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'

class AdminFeedback extends Component{
    state = {
        feedback: []
    }

  componentDidMount() {
    this.loadFeedback()
  }

  loadFeedback = async() => {
    const apiUrl = "http://localhost:5000/api/admin/feedback"
    const token = localStorage.getItem("jwt_token")
    const options = {
      headers : {
        Authorization : `Bearer ${token}`
      }, 
      method : "POST"
    }

    const response = await fetch(apiUrl , options)
    const data = await response.json()

    console.log("Feedback : " , data)

    this.setState({
      feedback : data,
    })


  }

  render() {
    const {feedback} = this.state

    return (
      <div className="feedback-background-container">
        <AdminHeader />
        <div className="tenants-container">
            <h1 className="title">Manage Feedback</h1>
            <table className="table-container">
              <thead>
                <tr className="t-ros">
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

export default AdminFeedback;