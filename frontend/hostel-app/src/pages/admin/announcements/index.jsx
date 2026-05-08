import './index.css'
import {Component} from 'react'
import AdminHeader from '../../../components/AdminHeader'


class AdminAnnouncements extends Component{

    state = {
        title : '',
        content : '',
        errorMessage : '',
    }

    onChangeTitle = event => {
        this.setState({
            title : event.target.value,
        })
    }

    onChangeContent = event => {
        this.setState({
            content : event.target.value,
        })
    }

    onSubmitAnnouncement = async(event) => {
        event.preventDefault()
        const token = localStorage.getItem("jwt_token")
        const {title , content} = this.state
        if (title === '' || content === ''){
            this.setState({
                errorMessage : 'All fields are required'
            })
        }
        else{
        const options = {
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json",
            },
            method : "POST",
            body : JSON.stringify({title : title, content: content})
        }
        const apiUrl = "http://localhost:5000/api/announcements/add-announcement"
        
        try {
            const response = await fetch(apiUrl, options)
            if (response.ok){
                    this.setState({
                        title : '',
                        content : '',
                    })
                    alert('Announcement has been added Successfully!!')
                }
                else{
                    this.setState({
                        errorMessage : data.error,
                    })
                }
        } 
        catch (error) {
            console.error("Network error:", error)
        }
    }
    }

    render(){
        const {title , content , errorMessage} = this.state
        return(
            <div className="announcement-background-container">
                <AdminHeader />
                <div className="announcement-details-container">
                    <h1 className="title">Add an Announcement</h1>
                    <form className="form-container" onSubmit={this.onSubmitAnnouncement}>
                        <div className="form-label-item">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" value={title} className="input-item" onChange={this.onChangeTitle} placeHolder="Enter the title of the announcement" id="title" />
                        </div>
                        <div className="form-label-item">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea rows="4" cols="50" className="input-item" value={content} placeHolder="Enter the content of the announcement" onChange={this.onChangeContent}></textarea>
                        </div>
                        <div className="form-button-container">
                            <button className="button" type="submit">Submit</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        )
    }

}


export default AdminAnnouncements;